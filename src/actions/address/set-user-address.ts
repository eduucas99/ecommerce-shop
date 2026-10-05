'use server';

import { Address } from "@/interfaces";
import { db } from "@/prisma/db";

export const setUserAddress = async(address: Address, userId: string) => {
    try {
        const saveAddress = await createOrReplaceAddress(address, userId);

        return {
            ok: true,
            address: saveAddress
        }
        
    } catch (error) {
        console.log(error);
        return{
            ok: false,
            message: 'No se pudo guardar la dirección.'
        }
    }
}

const createOrReplaceAddress = async(address: Address, userId: string) => {
    try {
        const storedAddress = await db.orm.public.UserAddress.where({ userId }).all();
        
        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2 ?? null,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode
        }

        if( storedAddress.length === 0 ){
            const newAddress = await db.orm.public.UserAddress.create(addressToSave);

            return newAddress;
        }

        const updateAddress = await db.orm.public.UserAddress.where({userId}).update(addressToSave);

        return updateAddress;
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo guardar la dirección.');
    }
}