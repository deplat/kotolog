'use server'

import { getCachedPets } from '@/data-access/pet'
import { PetCard } from '@/app/(admin)/_modules/pet-card'
import { checkUserRole } from '@/utils/checkUserRole'
import { UserRole } from '@/types/UserRole'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'

export const PetList = async () => {
  const { allowed } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    return <NotAuthorized />
  }
  const pets = await getCachedPets()
  if (!pets) return <div>Can't get pets, please try again later :(</div>
  return (
    <ul className="grid gap-x-3 gap-y-3 overflow-hidden sm:gap-x-5 sm:gap-y-5 lg:grid-cols-2 2xl:grid-cols-3">
      {pets.map((pet, index) => (
        <li key={index} className="overflow-hidden">
          <PetCard id={pet.id} name={pet.name} slug={pet.slug} avatarSrc={pet.avatar?.src} />
        </li>
      ))}
    </ul>
  )
}
