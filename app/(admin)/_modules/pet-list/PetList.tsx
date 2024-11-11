import { getCachedPets } from '@/data-access/pet'
import { PetCard } from '@/app/(admin)/_modules/pet-card'

export const PetList = async () => {
  const pets = await getCachedPets()
  return (
    <div className="mx-auto flex w-full flex-col p-3">
      {pets ? (
        <ul className="flex flex-col gap-y-4">
          {pets.map((pet, index) => (
            <li key={index}>
              <PetCard id={pet.id} name={pet.name} slug={pet.slug} avatarSrc={pet.avatar?.src} />
            </li>
          ))}
        </ul>
      ) : (
        <div>Can't get pets, please try again later :(</div>
      )}
    </div>
  )
}
