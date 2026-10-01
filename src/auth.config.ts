import NextAuth, { type  NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/prisma/db.ts';

export const authConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    callbacks: {
        jwt({ token, user }) {
            if ( user ){
                token.data = user;
            }
            // console.log("JWT callback:", { token, user });
            return token;

        },
        session({ session, token, user }) {
            session.user = token.data as any;
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                // Buscar el correo
                const user = await db.orm.public!.User!.where({ email: email.toLowerCase() }).first();
                if (!user) return null;
                
                // Comparar las contraseñas
                if (!bcrypt.compareSync( password, user.password )) return null;

                // Regresar el usuario si las credenciales son válidas
                const { password: _, ...rest } = user;
                console.log("Usuario autenticado:", rest);
                return rest;
            },
        }),
    ],
}

export const { signIn, signOut, auth, handlers} = NextAuth( authConfig );