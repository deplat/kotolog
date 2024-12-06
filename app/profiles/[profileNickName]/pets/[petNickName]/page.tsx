import { getCachedColors, getPetFullByNickName } from '@/data-access'
import { PetEditor } from '@/modules/pet-editor'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Page(props: {
  params: Promise<{ petNickName: string; profileNickName: string }>
}) {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />

  const profileNickName = (await props.params).profileNickName
  if (!profileNickName) return <>Incorrect profile nick name.</>

  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null
  const petNickName = (await props.params).petNickName
  try {
    const { success, message, data } = await getPetFullByNickName(petNickName)
    if (!data) return <div>There's no pet with nickName: {petNickName}</div>
    const colors = await getCachedColors()
    const colorOptions = colors.map((color) => ({ value: color.id, label: color.name }))
    return (
      <main className="flex w-full justify-center px-3">
        <PetEditor pet={data} colorOptions={colorOptions} profile={{ nickName: profileNickName }} />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
