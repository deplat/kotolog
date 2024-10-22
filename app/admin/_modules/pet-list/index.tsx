import { getPets } from '@/app/admin/_data-access/pet'
import { PetCard } from '@/app/admin/_modules/pet-list/components/pet-card'

export const PetList = async () => {
  const pets = await getPets()
  return (
    <div className="flex h-fit w-fit min-w-64 max-w-xl flex-col border border-stone-950 p-3">
      <h3 className="mb-2.5 text-2xl">Pets</h3>
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
