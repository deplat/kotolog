import { getCachedColors } from '@/data-access'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'
import { getProfileByNickName } from '@/data-access/profile'
import { CreatePetForm } from '../../../../../modules/pet-form'

export default async function Page({ params }: { params: Promise<{ profileNickName: string }> }) {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const profileNickName = (await params).profileNickName
  if (!profileNickName) return <>Incorrect profile nick name.</>
  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null

  try {
    const profile = await getProfileByNickName(profileNickName)
    if (!profile) return <>Такого профиля не существует.</>
    const colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    const colorOptions = colors.map((color) => ({ value: color.id, label: color.name }))
    return (
      <main className="flex w-full justify-center px-3">
        <CreatePetForm colorOptions={colorOptions} profile={profile} />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
