import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    providers: [
        
    ],
})