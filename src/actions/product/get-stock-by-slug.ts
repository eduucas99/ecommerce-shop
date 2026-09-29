'use server';

import { db } from "@/prisma/db";

export const getStockBySlug = async(slug: string): Promise<number> => {
    try {
            
        const product = await db.orm.public.Product.where({
            slug
        })
        .select("inStock")
        .first();
    
        return product!.inStock ?? 0;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug');
    }
}