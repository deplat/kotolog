import { Navbar } from '@/app/admin/_modules/nav'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'
import { Controls } from '@/app/admin/_modules/controls'

export default async function Layout({
  children,
}: Readonly<{
  editor: React.ReactNode
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
    <div className="flex w-full flex-col">
      <Navbar />
      {children}
      <div className="fixed bottom-0 flex w-full">
        <Controls />
      </div>
    </div>
  )
}
