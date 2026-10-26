'use server';

import { auth } from "@/auth.config";
import { db } from "@/prisma/db";

export const getPaginatedOrders = async() => {
    const session = await auth();

    if( session?.user?.role !== 'admin' ) {
        return { 
            ok: false,
            message: 'Debe estar autenticado'
        }
    }

    const orders = await db.orm.public.Order
        .include("OrderAddress", (address) => address.select("firstName", "lastName"))
        .orderBy((o) => o.createdAt.desc())
        .all();

    return {
        ok: true,
        orders: orders
    }
    
}