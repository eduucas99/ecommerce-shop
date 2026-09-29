'use server'
import { db } from "@/prisma/db"

interface PaginationOptions {
    page?: number;
    limit?: number;
}

export const getPaginatedProductsWithImages = async({
    page = 1,
    limit = 12
}: PaginationOptions) =>{
    if ( isNaN(Number(page)) ) page = 1;
    if ( page < 1 ) page = 1;

    try {
        //1. Obtener los productos
        const products = await db.orm.public.Product
            .include("ProductImage", (image) =>
                image
                .select("url")
                .orderBy((i) => i.id.asc())
            )
            .limit(limit)
            .offset((page - 1) * limit)
            .all();
        //2. Obtener el total de páginas
        const { total: totalCount } = await db.orm.public.Product.aggregate((a) => ({ total: a.count() }));
        const totalPages = Math.ceil(totalCount / limit);
        
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map( p => ({
                ...p,
                images: p.ProductImage.map( image => image.url),
            }))
        }
    } catch (error) {
        throw new Error('No se pudo cargar los productos.');
    }
}