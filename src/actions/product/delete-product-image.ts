'use server';

import { db } from '@/prisma/db';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  
    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'No se pueden eliminar imágenes locales.'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0];

    try {
        await cloudinary.uploader.destroy(imageName ?? '', { resource_type: 'image' });
        const image = await db.orm.public.ProductImage
            .where({ id: imageId })
            .include('product')
            .first();

        if (!image) {
        throw new Error('Imagen no encontrada.');
        }

        await db.orm.public.ProductImage.where({ id: imageId }).delete();
        const slug = image.product.slug;

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${slug}`);

        return {
            ok: true,
            message: 'Imagen eliminada correctamente.'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error instanceof Error ? error.message : 'Error al eliminar la imagen.'
        }
    }
}