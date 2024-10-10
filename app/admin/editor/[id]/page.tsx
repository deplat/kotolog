import { getPet, Pet } from '../(data-access)/pet'
import { PetEditor } from '../(modules)/pet-editor'
import { cachedColors } from '../(data-access)'
import { Colors } from '../(data-access)'

export default async function Page({ params }: { params: { id: number } }) {
  const id = Number(params.id)
  if (isNaN(id) || id <= 0) {
    return <div>Invalid pet ID.</div>
  }
  try {
    const pet: Pet = await getPet(id)
    if (!pet) return <div>There's no pet with id: {id}</div>
    const colors: Colors = await cachedColors()
    if (!colors) console.log('Error fetching colors.')
    return <PetEditor pet={pet} colors={colors} />
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}
