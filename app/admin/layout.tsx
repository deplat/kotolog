import { AdminNav } from '@/app/admin/(modules)/admin-nav'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'
import { SessionProvider } from 'next-auth/react'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) {
    return (
      <main className="flex w-full items-center justify-center">
        <div>
          Not authenticated :( <SignIn label="Sign In" />
        </div>
      </main>
    )
  }
  if (!session.user.isAdmin) {
    return (
      <main className="flex w-full items-center justify-center">
        <div>
          Not authorized :( <SignOut label="Sign Out" />
        </div>
      </main>
    )
  }
  return (
    <SessionProvider>
      <div className="flex w-full flex-col">
        <AdminNav />
        <main className="flex flex-1 justify-center">{children}</main>
      </div>
    </SessionProvider>
  )
}
