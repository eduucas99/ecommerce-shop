'use server';

import { db } from "@/prisma/db";


export const getCountries = async () =>{
    try{
        const countries = db.orm.public.Country
        .orderBy((c) => c.name.asc())
        .all();

        return (await countries).map(({ id, name }) => ({ id, name }));
    }catch(error){
        console.log("ERROR", error);
        return [];
    }
}