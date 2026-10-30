'use server'

import { Size } from '@/interfaces';
import { db } from '@/prisma/db';
import type { ResultType } from '@prisma/orm-postgres/components/runtime';
import { z } from 'zod';

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
        console.log(productParsed.error);
        return {
            ok: false
        }
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const {id, ...rest} = product;

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

            console.log({updatedProduct: product})
        }else{
            //crear producto
        }


        return {
        
        }
    });

    return{
        ok: true
    }
}