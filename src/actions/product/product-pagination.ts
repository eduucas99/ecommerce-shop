'use server'
import { db } from "@/prisma/db"

type Gender = "men" | "women" | "kid" | "unisex";

interface PaginationOptions {
    page?: number;
    limit?: number;
    gender?: Gender | "";
}

export const getPaginatedProductsWithImages = async({
    page = 1,
    limit = 12,
    gender
}: PaginationOptions) =>{
    if ( isNaN(Number(page)) ) page = 1;
    if ( page < 1 ) page = 1;

    try {
        //1. Obtener los productos
        const base = db.orm.public.Product.include("ProductImage", (image) =>
            image.select("url").orderBy((i) => i.id.asc())
        );

        const query = gender !== "" ? base.where({ gender }) : base;

        // 2. Ejecutarla con paginación
        const products = await query
        .limit(limit)
        .offset((page - 1) * limit)
        .all();
        
        //2. Obtener el total de páginas
        const baseProducts = db.orm.public.Product;

        const filtered = gender !== "" ? baseProducts.where({ gender }) : baseProducts;

        const { total: totalCount } = await filtered.aggregate((a) => ({
            total: a.count(),
        }));

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