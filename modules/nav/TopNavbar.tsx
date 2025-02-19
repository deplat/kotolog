import { auth } from '@/auth'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'
import Link from 'next/link'

export const TopNavbar = async () => {
  const user = (await auth())?.user
  if (!user?.id) return null
  const hasPermissions = await validateUserAppRole(user.id, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null

  const links = [
    { title: 'Питомцы', href: '/admin/pets' },
    { title: 'Окрасы', href: '/admin/colors' },
    { title: 'Профили', href: '/admin/profiles' },
    { title: 'Пользователи', href: '/admin/users' },
  ]

  return (
    <nav className="mx-auto flex max-w-6xl items-center space-x-4 p-4 sm:px-6">
      {links.map(({ title, href }, index) => (
        <Link
          key={index}
          href={href}
          className="text-lg decoration-orange-600 decoration-2 underline-offset-4 transition-opacity duration-700 hover:underline"
        >
          {title}
        </Link>
      ))}
    </nav>
  )
}
