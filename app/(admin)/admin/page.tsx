'use server'

import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { NotAuthorized } from '@/components/NotAuthorized'
import { redirect } from 'next/navigation'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'
import { getProfiles } from '@/data-access'
import { PetList } from '@/modules/pet-list'

export default async function Page() {
  const user = (await auth())?.user
  if (!user?.id) return <NotAuthenticated />
  const hasPermissions = await validateUserAppRole(user.id, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return <NotAuthorized />
  const profiles = await getProfiles()
  return (
    <div className="grid grid-cols-3">
      <div>
        <h2 className="text-2xl">Profiles</h2>
        <ol>{profiles?.map(({ id, name }) => <li key={id}>{name}</li>)}</ol>
      </div>
      <div>
        <h2 className="text-2xl">Pets</h2>
        <PetList profileNickName={'kotolife'} />
      </div>
      <div>
        <h2 className="text-2xl">Users</h2>
      </div>
    </div>
  )
}
