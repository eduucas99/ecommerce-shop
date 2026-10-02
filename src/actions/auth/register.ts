'use server';
import { db } from "@/prisma/db";
import bcrypt from "bcryptjs";

export const registerUser = async ( name: string, email: string, password: string ) => {

    try {
        const user = await db.orm.public.User
        .select("id", "name", "email")
        .create({
            name: name,
            email: email.toLowerCase(),
            password: bcrypt.hashSync( password ),
        })
        
        return{
            ok: true,
            message: 'Usuario registrado correctamente',
            user: user
        }

    }catch (error) {
        console.error(error);
        return{
            ok: false,
            message: 'Error al registrar el usuario'
        }
    }

}