import { getCachedPets } from '@/data-access/pet'
import { PetCard } from '@/app/admin/_modules/pet-card'
import AvatarToggleLink from '@/app/admin/_modules/pet-list/components/AvatarToggleLink'

export const PetList = async () => {
  const pets = await getCachedPets()
  return (
    <div className="flex h-fit w-full max-w-xl flex-col border border-stone-950 bg-stone-50 p-3 shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="mb-2.5 text-2xl">Pets</h3>
        <AvatarToggleLink />
      </div>
      {pets ? (
        <ul className="flex flex-col gap-y-3">
          {pets.map((pet, index) => (
            <li key={index} className="flex">
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
