import { PetList } from '@/app/admin/_modules/pet-list'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'

export default async function Admin() {
  const session = await auth()
  const isAdmin = session?.user
  if (!session) {
    return (
      <main className="flex w-full items-center justify-center">
        <div>
          Not authenticated :( <SignIn label="Sign In" />
        </div>
      </main>
    )
  }
  if (!isAdmin) {
    return (
      <main className="flex w-full items-center justify-center">
        <div>
          Not authorized :( <SignOut label="Sign Out" />
        </div>
      </main>
    )
  }
  return (
    <main className="flex flex-1 p-3">
      <div className="flex w-full">
        <PetList />
      </div>
    </main>
  )
}
