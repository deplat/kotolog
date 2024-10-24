import { getCachedColors } from '../../_data-access'
import { PetEditor } from '@/app/admin/_modules/pet-editor'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'

export default async function Page() {
  const session = await auth()
  const isAdmin = session?.user.isAdmin
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

  try {
    const colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    return (
      <main className="flex w-full justify-center">
        <PetEditor pet={null} colors={colors} />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
