"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import { db } from "@/prisma/db";

export const paypalCheckPayment = async( paypalTransactionId: string ) => {
    
    const authToken = await getPaypalBearerToken();


    if ( !authToken ){
        return{
            ok: false,
            message: "No se pudo obtener el token de verificación"
        }
    }

    const resp = await verifyPaypalPayment(paypalTransactionId, authToken);

    if ( !resp ){
        return{
            ok: false,
            message: "Error al verificar el pago"
        }
    }

    const { status, purchase_units } = resp;
    //const { } = purchase_units[0]; // TODO invoice ID

    if ( status !== 'COMPLETED' ) {
        return{
            ok: false,
            message: "Aún no se ha efectuado el pago."
        }
    }
    
    try {
        console.log(status, purchase_units);

        await db.orm.public.Order.where({id: '40baa072-1146-4b2b-81ac-08db99e46433' })
        .update(
            {
                isPaid: true,
                paidAt: Temporal.Now.instant(),
            }
        );
    } catch (error) {
        console.log(error);
        return{
            ok: false,
            message: '500 - El pago no se pudo realizar'
        }
    }

}

const getPaypalBearerToken = async(): Promise<string|null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2url = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(
        `${ PAYPAL_CLIENT_ID}:${ PAYPAL_SECRET }`,
        "utf-8"
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");


    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect
    };

    try {
        const result = await fetch(oauth2url,  {
            ...requestOptions,
            cache: 'no-store'
        }).then( r => r.json());
        
        return result.access_token;
    } catch (error) {
        console.log(error)
        
        return null;
    }
}

const verifyPaypalPayment = async( paypalTransactionId: string, bearerToken: string ): Promise<PaypalOrderStatusResponse|null> => {
    
    const paypalOrderUrl =  `${ process.env.PAYPAL_ORDERS_URL }/${ paypalTransactionId }`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${ bearerToken }`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const resp = await fetch(paypalOrderUrl, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json());
        
        return resp;
    } catch (error) {
        console.log(error);
        return null;
    }
}