import { AdminNav } from '@/app/admin/(modules)/admin-nav'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) {
    return (
      <main className="flex items-center justify-center">
        <p>
          Not authenticated :( <SignIn />
        </p>
      </main>
    )
  }
  if (!session.user.isAdmin) {
    return (
      <main className="flex items-center justify-center">
        <p>
          Not authorized :( <SignOut />
        </p>
      </main>
    )
  }
  return (
    <div className="flex w-full flex-col">
      <AdminNav />
      <main className="flex flex-1 justify-center">{children}</main>
    </div>
  )
}
