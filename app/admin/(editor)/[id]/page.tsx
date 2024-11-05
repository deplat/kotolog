import { getPet, getCachedColors, Pet, Colors } from '@/data-access'
import { PetEditor } from '@/app/admin/_modules/pet-editor'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/admin/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/admin/_components/NotAuthorized'

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const session = await auth()
  const userRole = session?.user.role
  if (!session) {
    return <NotAuthenticated />
  }
  if (userRole == 'USER') {
    return <NotAuthorized />
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
    return (
      <main className="flex w-full justify-center px-3">
        <PetEditor pet={pet} colors={colors} />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
