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

    // Crear la transacción de la base de datos
    

    return{
        productIds, address, userId
    }

    // return{
    //     ok: false
    // }
}