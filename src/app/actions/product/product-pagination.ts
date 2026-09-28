'use server'
import { db } from "@/prisma/db"

export const getPaginatedProductsWithImages = async() =>{
    try {
        const products = await db.orm.public.Product
            .include("ProductImage", (image) =>
                image
                .select("url")
                .orderBy((i) => i.id.asc())
                
            ).limit(3).all();

        return {
            currentPage: 1,
            totalPages: 10,
            products: products.map( p => ({
                ...p,
                images: p.ProductImage.map( image => image.url),
            }))
        }
    } catch (error) {
        throw new Error('No se pudo cargar los productos.');
    }
}