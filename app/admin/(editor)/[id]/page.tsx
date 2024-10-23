import { getPet, getCachedColors, Pet, Colors } from '../../_data-access'
import { PetEditor } from '@/app/admin/_modules/pet-editor'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'

export default async function Page(props: { params: Promise<{ id: number }> }) {
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
  const params = await props.params
  const id = Number(params.id)
  if (isNaN(id) || id <= 0) {
    return <div>Invalid pet ID.</div>
  }
  try {
    const pet: Pet = await getPet(id)
    if (!pet) return <div>There's no pet with id: {id}</div>
    const colors: Colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    return <PetEditor pet={pet} colors={colors} />
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
