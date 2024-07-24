import NextAuth, {type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Nodemailer from "@auth/core/providers/nodemailer";
const prisma = new PrismaClient()

declare module "next-auth" {
    interface Session {
        user: {
            isAdmin: boolean;
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: 587,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    callbacks: {
        session({ session, token, user }) {
            // `session.user.address` is now a valid property, and will be type-checked
            // in places like `useSession().data.user` or `auth().user`
            return {
                ...session,
                user: {
                    ...session.user,
                    isAdmin: user.isAdmin,
                },
            }
        },
    }
})