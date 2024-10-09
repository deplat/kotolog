import { getPet, Pet } from '@/app/admin/editor/(data-access)/pet'
import { PetEditor } from '@/app/admin/editor/(modules)/pet-editor'
import { cachedColors } from '../(data-access)'
import { Colors } from '@/app/admin/editor/(data-access)/color'

export default async function Page({ params }: { params: { id: number } }) {
  const pet: Pet = await getPet(Number(params.id))
  console.log(pet)
  const colors: Colors = await cachedColors()
  console.log(colors)
  if (!pet) {
    return <div>There's nothing here.</div>
  }
  return (
    <div className="flex w-full justify-center">
      <PetEditor pet={pet} colors={colors} />
    </div>
  )
}
