import { getCachedPets } from '@/app/admin/_data-access/pet'
import { PetCard } from '@/app/admin/_modules/pet-card'

export const PetList = async ({ showAvatars }: { showAvatars: boolean }) => {
  const pets = await getCachedPets()
  return (
    <div className="flex h-fit w-full max-w-xl flex-col border border-stone-950 bg-stone-50 p-3 shadow-md">
      <h3 className="mb-2.5 text-2xl">Pets</h3>
      {pets ? (
        <ul className="flex flex-col gap-y-3">
          {pets.map((pet, index) => (
            <li key={index} className="flex">
              <PetCard
                id={pet.id}
                name={pet.name}
                slug={pet.slug}
                avatarSrc={pet.avatar?.src}
                showAvatar={showAvatars}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>Can't get pets, please try again later :(</div>
      )}
    </div>
  )
}
