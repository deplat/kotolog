import { getPets } from '@/app/admin/editor/(data-access)/pet'
import { IoPencil, IoTrashBin } from 'react-icons/io5'
import Image from 'next/image'

export const PetList = async () => {
  const pets = await getPets()
  return (
    <div className="flex h-fit flex-col border border-stone-950 p-3">
      <span className="mb-2.5 text-2xl">Pets</span>
      {pets ? (
        <ul className="flex flex-col gap-y-3">
          {pets.map((pet, index) => (
            <li key={index} className="flex min-w-80 items-center border border-stone-950 p-3">
              <Image src={pet.avatar?.src || ''} alt={pet.name} width={100} height={100} />
              <span>{pet.name}</span>
              <span className="me-auto">{pet.slug}</span>
              <IoPencil size={20} />
              <IoTrashBin size={20} className="hover:text-red-600" />
            </li>
          ))}
        </ul>
      ) : (
        <div>Can't get pets, please try again later :(</div>
      )}
    </div>
  )
}
