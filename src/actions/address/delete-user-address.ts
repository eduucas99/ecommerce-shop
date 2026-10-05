'use server';
import { db } from "@/prisma/db";


export const deleteUserAddress = async(userId: string) =>{
    try {
        const storedAddress = await db.orm.public.UserAddress.where({ userId }).all();

        if( storedAddress.length > 0 ){
            await db.orm.public.UserAddress
            .where({ userId })
            .delete();
        
            return {
                ok: true,
                message: "Dirección eliminada correctamente."
            }
        }
    } catch (error) {
        console.log(error);
        return{
            ok: false,
            message: "No se pudo eliminar la dirección."
        }
    }
    
}