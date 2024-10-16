import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth'

import { prisma } from '@/prisma'

// Extend the NextAuth Session and AdapterUser types
declare module 'next-auth' {
  interface Session {
    user: {
      /** Indicates if the user is an admin */
      isAdmin: boolean
    } & DefaultSession['user']
  }
  interface User {
    isAdmin: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'database',
  },
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      // Return the updated session user with additional properties
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          isAdmin: user.isAdmin ?? false, // Provide a default value if isAdmin is undefined
        },
      }
    },
  },
})
