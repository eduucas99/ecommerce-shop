'use server';

import { db } from "@/prisma/db";

export const getProductBySlug = async (slug: string) => {
    try {
        
        const product = await db.orm.public.Product.where({
            slug
        }).include("ProductImage", (image) =>
            image.select("url").orderBy((i) => i.id.asc())
        )
        .first();

        if ( !product ) return null;

        return {
            ...product,
            images: product.ProductImage.map(image => image.url),
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug');
    }
}