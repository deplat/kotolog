import { getCachedColors, Colors, getPetBaseById } from '@/data-access'
import { PetEditor } from '@/modules/pet-editor'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Page(props: {
  params: Promise<{ id: string; profileNickName: string }>
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
  const id = (await props.params).id
  try {
    const { success, message, data } = await getPetBaseById(id)
    if (!data) return <div>There's no pet with id: {id}</div>
    const colors: Colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    return (
      <main className="flex w-full justify-center px-3">
        <PetEditor pet={data} colors={colors} profile={{ nickName: profileNickName }} />
      </main>
    )
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
