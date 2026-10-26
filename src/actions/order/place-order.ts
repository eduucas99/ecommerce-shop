'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import { db } from "@/prisma/db";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {
    const session = await auth();
    const userId = session?.user.id ;

    //Verificar sesion de usuario
    if ( !userId ){
        return{
            ok: false,
            message: 'Debe iniciar sesión.'
        }
    }

    // Obtener la informacion de los productos. Podemos llevar 2 o mas productos con el mismo ID
    const ids = productIds.map((p) => p.productId);

    const products = await db.orm.public.Product
    .where((p) => p.id.in(ids))
    .all();
    
    // Calcular los montos // Encabezado
    const itemsInOrder = productIds.reduce( (count, p) => count + p.quantity, 0);
    
    // Los totales de tax, subtotal y total
    const { subTotal, tax, total } = productIds.reduce( (totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find( p => p.id === item.productId );

        if( !product ) throw new Error(`Error 500 - ${ item.productId } no existe.`);

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;
        
        return totals;
    }, { subTotal: 0, tax: 0, total: 0 })

    try {
        const prismaTx = await db.transaction( async(tx)=>{
            // 1. Actualizar stock de los productos
            const updatedProductsPromises = products.map( ( product ) => {
                // Acumular los valores
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce( (acc, item) => item.quantity + acc, 0 );
                
                if ( productQuantity === 0 ) throw new Error(`${ product.id } no tiene cantidad definida.`);
                
                return tx.orm.public.Product.where({ id: product.id }).update({
                    inStock: product.inStock - productQuantity
                })
            });

            const updateProducts = await Promise.all( updatedProductsPromises );
            
            // Verificar valores negativos en las existencias = no hay stock
            updateProducts.forEach( product => {
                if (product && product.inStock != null && product.inStock < 0 ){
                    throw new Error (`${ product.title } no tiene mas stock.`)
                }
            })
            // 2. Crear la orden - Encabezado - Detalle
            const order = await tx.orm.public.Order.create({
                userId,
                itemsInOrder,
                subTotal,
                tax,
                total,

                OrderItem: (items) =>
                    items.create(
                    productIds.map((item) => {
                        const product = products.find((p) => p.id === item.productId);
                        if (!product) throw new Error(`Producto ${item.productId} no existe`);
                        return {
                        quantity: item.quantity,
                        size: item.size,
                        productId: item.productId,
                        price: product.price,
                        };
                    })
                ),
            });
            
            // 3. Crear la dirección de la orden
            const orderAddress = await tx.orm.public.OrderAddress.create({
                firstName: address.firstName,
                lastName: address.lastName,
                address: address.address,
                address2: address.address2 ?? null,
                postalCode: address.postalCode,
                city: address.city,
                phone: address.phone,
                countryId: address.country,
                orderId: order.id,
            });

            return {
                order: order,
                updateProducts: updateProducts,
                orderAddress:orderAddress
            }
        });

        return { 
            ok: true,
            orderId: prismaTx.order.id
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message,
        }
    }
    // Crear la transacción de la base de datos
   
    return{
        productIds, address, userId
    }

    // return{
    //     ok: false
    // }
}