"use server";
import { db } from "@/prisma/db"


export const setTransactionId = async(orderId: string, transactionId: string) => {

    try{
        const order = db.orm.public.Order.where({id: orderId}).update({transactionId})

        if ( !order ){
            return {
                ok: false,
                message: `No se encontro la orden con el id ${ orderId }.`
            }
        }

        return {
            ok: true,
        }
    }catch(error){
        console.log(error)
        
        return {
            ok: false,
            message: `Error al actualizar la transacción.`
        }
    }
    
}