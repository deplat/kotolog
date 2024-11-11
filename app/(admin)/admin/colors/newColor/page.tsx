import { checkUserRole } from '@/utils/checkUserRole'
import { UserRole } from '@/types/UserRole'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'
import { ColorEditor } from '@/app/(admin)/_modules/color-editor'

export default async function Page() {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to visit this page.`)
    return <NotAuthorized />
  }
  return (
    <>
      <ColorEditor color={null} />
    </>
  )
}
