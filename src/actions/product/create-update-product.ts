'use server'

import { Size } from '@/interfaces';
import { db } from '@/prisma/db';
import type { ResultType } from '@prisma/orm-postgres/components/runtime';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Product = ResultType<typeof db.orm.public.Product>;

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string().min(3),
    price: z.coerce.number().min(0).transform( val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform( val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform( val => val.split(',')),
    tags: z.string(),
    gender: z.enum(['men', 'women', 'kid', 'unisex'])
    
})

export const createUpdateProduct = async( formData: FormData ) => {

    const data = Object.fromEntries( formData );
    const productParsed = productSchema.safeParse( data );

    if ( !productParsed.success ){
        console.log("error: ",productParsed.error);
        return {
            ok: false,
            message: 'Error al crear/actualizar el producto'
        }
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const {id, ...rest} = product;

    try {
        const prismaTransaction = await db.transaction(async(tx)=>{
            let product: Product;
            const tagsArray = rest.tags.split(',').map( tag => tag.trim().toLowerCase() );
            
            if ( id ){

                const product = await tx.orm.public.Product
                .where({ id })
                .update({
                    ...rest,
                    sizes: rest.sizes as Size[],
                    tags: tagsArray,
                });

                return{
                    ok: true,
                    product
                }
                
            }else{
                const product = await tx.orm.public.Product.create({
                    ...rest,
                    sizes: rest.sizes as Size[],
                    tags: tagsArray,
                });
                
               
                return {
                    ok: true,
                    product
                }
            }
    
    
        });

        if (formData.getAll('images')) {
           const images = await uploadImages(formData.getAll('images') as File[]);
           console.log(images)
        }

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);

        return {
            ok: true,
            product: prismaTransaction.product
        }

    }catch (error) {
        console.log("Error: ", error)
        return {
            ok: false,
            message: 'Error al crear/actualizar el producto'
        }
    }

}

const uploadImages = async (files: File[]) => {
    try {
        const uploadPromises = files.map(async (file) => {
            try {
                const buffer = Buffer.from(await file.arrayBuffer());
                const base64 = buffer.toString('base64');

                const result = await cloudinary.uploader.upload(
                    `data:${file.type};base64,${base64}`,
                    { folder: 'ecommerce-shop' }
                );

                return result.secure_url;
            } catch (error) {
                console.error('Error al subir imagen a Cloudinary:', error);
                return null;
            }
        });
        
        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.log('Error al subir imagenes: ', error);
        return null
    }
}