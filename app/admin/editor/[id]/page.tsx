import { getPet, Pet } from './(data-access)/pet'
import { PetEditor } from './(modules)/pet-editor'
import { cachedColors } from './(data-access)'
import { Colors } from '@/app/admin/editor/[id]/(data-access)/color'

export default async function Page({ params }: { params: { id: number } }) {
  const pet: Pet = await getPet(Number(params.id))
  const colors: Colors = await cachedColors()
  if (!pet) {
    return <div>There's nothing here.</div>
  }
  return (
    <div>
      <PetEditor pet={pet} colors={colors} />
    </div>
  )
}
