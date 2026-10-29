'use server';

import { db } from "@/prisma/db";

export const getCategories = async () => {
    try {
        const categories = await db.orm.public.Category.all();

        if ( !categories ) return null;

        return {
            ok:true,
            categories: categories
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las categorias');
    }
}