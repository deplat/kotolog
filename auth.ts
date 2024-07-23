import NextAuth, {NextAuthConfig} from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/db/prisma";
import Nodemailer from "next-auth/providers/nodemailer"

export const authConfig : NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port : 587,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        },),
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.isAdmin = user.isAdmin
            return session
        }
    }
}


export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
