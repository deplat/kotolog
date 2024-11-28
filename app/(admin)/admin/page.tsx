'use server'

import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'
import { redirect } from 'next/navigation'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Page() {
  const user = (await auth())?.user
  if (!user?.id) return <NotAuthenticated />
  const hasPermissions = await validateUserAppRole(user.id, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return <NotAuthorized />
  redirect('/admin/pets')
}
