import Image from 'next/image'
import { IoDocument, IoTrashBin } from 'react-icons/io5'
import { deletePet, Pets } from '../(data-access)'
import { useRouter } from 'next/navigation'

export const PetList = ({ pets }: { pets: Pets }) => {
  const router = useRouter()
  const onDeletePet = async (id: number) => {
    try {
      await deletePet(id)
      console.log('Pet deleted successfully')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div>
        <ul>
          {pets.map((pet) => (
            <li key={pet.id} className="flex items-center gap-x-4 border-b-2 p-3">
              <div className="relative flex h-20 w-20 items-center justify-center bg-gray-200">
                {pet.avatar?.src ? (
                  <Image
                    src={pet.avatar.src}
                    alt={pet.name}
                    width={pet.avatar.width}
                    height={pet.avatar.height}
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {pet.name}
                  </span>
                )}
              </div>
              <span>{pet.name}</span>
              <span className="text-gray-600">{pet.slug}</span>
              <div className="ms-auto">
                <button
                  className="rounded bg-blue-100 px-2 py-1 text-white"
                  onClick={() => router.push(`/admin/editor/${pet.id}`)}
                >
                  <IoDocument size={24} />
                </button>
              </div>
              <div className="items-center">
                <button className="text-red-600" onClick={() => onDeletePet(pet.id)}>
                  <IoTrashBin size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
