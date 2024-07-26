import NextAuth, {type DefaultSession} from "next-auth"
import GitHub from "next-auth/providers/github"
import {PrismaAdapter}  from "@auth/prisma-adapter"
import prisma from "@/lib/db/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            isAdmin: boolean;
        } & DefaultSession["user"];
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    adapter: PrismaAdapter(prisma) as any,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        session({ session, user }) {
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
    },
})


