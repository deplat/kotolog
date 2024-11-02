import { getCachedColors } from '../../_data-access'
import { PetEditor } from '@/app/admin/_modules/pet-editor'
import { auth } from '@/auth'
import { UserRole } from '@/types/UserRole'
import { NotAuthenticated } from '@/app/admin/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/admin/_components/NotAuthorized'

export default async function Page() {
  const session = await auth()
  const userRole = session?.user.role
  if (!session) {
    return <NotAuthenticated />
  }
  if (userRole == UserRole.USER) {
    return <NotAuthorized />
  }

  try {
    const colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    return (
      <main className="flex w-full justify-center px-3">
        <PetEditor pet={null} colors={colors} />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
