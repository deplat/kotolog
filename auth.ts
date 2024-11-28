import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Yandex from 'next-auth/providers/yandex'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth'
import type { UserAppRole } from '@prisma/client'

import { prisma } from '@/prisma/prisma'

declare module 'next-auth' {
  interface Session {
    user: {
      role: UserAppRole
    } & DefaultSession['user']
  }

  interface User {
    role: UserAppRole
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'database',
  },
  providers: [Yandex, Google, GitHub],
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
          role: user.role,
        },
      }
    },
  },
})
