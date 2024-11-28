import { auth } from '@/auth'
import { NavbarControls } from '@/app/(admin)/_modules/nav/NavbarControls'
import { UserAppRole } from '@prisma/client'
import { validateUserAppRole } from '@/utils/validateUserAppRole'

export const Navbar = async () => {
  const user = (await auth())?.user
  if (!user?.id) return null
  const hasPermissions = await validateUserAppRole(user.id, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null
  return <NavbarControls />
}
