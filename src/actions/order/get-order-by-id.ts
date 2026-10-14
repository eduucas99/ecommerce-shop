'use server';

import { auth } from "@/auth.config";
import { db } from "@/prisma/db";

export const getOrderById = async(id: string) => {
    const session = await auth();

    if ( !session?.user ){
        return{
            ok: false,
            message: "Debe de estar autenticado"
        }
    }

    try {
        const order = await db.orm.public.Order
        .where({ id })
        .include("OrderAddress", (address) => address.include("country"))
        .include("OrderItem", (item) =>
            item.include("product", (product) => product.include("ProductImage"))
        )
        .first();

        if( !order ) throw `${id} no existe`;

        if ( session?.user.role === 'user' ){
            if ( session?.user.id != order.userId ){
                throw `${id} no es de ese usuario`;
            }
        }

        return {ok: true, order: order};
    } catch (error) {
        return {
            ok: false,
            message: "La orden no existe"
        }
    }    
    
    
}