'use server'

import { getCachedPetsBase, getPetsBase } from '@/data-access/pet'
import { PetCard } from '@/modules/pet-card'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'
import { NotAuthorized } from '@/components/NotAuthorized'

export const PetList = async ({ profileNickName }: { profileNickName: string }) => {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const hasPermissions = await validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return <NotAuthorized />
  const pets = await getPetsBase(profileNickName)
  if (!pets) return <div>Can't get pets, please try again later :(</div>
  return (
    <ul className="grid gap-x-3 gap-y-3 overflow-hidden sm:gap-x-5 sm:gap-y-5 md:grid-cols-2 2xl:grid-cols-3">
      {pets.map((pet, index) => (
        <li key={index} className="overflow-hidden">
          <PetCard
            id={pet.id}
            name={pet.name}
            nickName={pet.nickName}
            avatarSrc={pet.photos[0].src}
          />
        </li>
      ))}
    </ul>
  )
}
