import { auth } from '@/auth'
import { UserAppRole } from '@prisma/client'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { BottomNavbar } from './BottomNavbar'
import { TopNavbar } from './TopNavbar'

interface NavbarProps {
  position: 'top' | 'bottom' | 'left' | 'right'
}

export const Navbar = async ({ position }: NavbarProps) => {
  const user = (await auth())?.user
  if (!user?.id) return null
  const hasPermissions = await validateUserAppRole(user.id, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null

  switch (position) {
    case 'bottom':
      return <BottomNavbar />
    case 'top':
      return <TopNavbar />
  }
}
