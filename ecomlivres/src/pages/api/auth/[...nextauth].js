import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
   
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENTSECRET
        })
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    
}

export default NextAuth(authOptions)
