import { getCachedColors } from '@/data-access'
import { PetEditor } from '@/app/(admin)/_modules/pet-editor'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Page() {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null

  try {
    const colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    return (
      <main className="flex w-full justify-center px-3">
        <PetEditor
          pet={null}
          colors={colors}
          profile={{ id: 'cm42kx9yk00012067occe7tjg', name: 'Kotolife' }}
        />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
