import { getCachedColors } from '../(data-access)'
import { PetEditor } from '../(modules)/pet-editor'

export default async function Page() {
  try {
    const colors = await getCachedColors()
    if (!colors) console.log('Error fetching colors.')
    return <PetEditor pet={null} colors={colors} />
  } catch (error) {
    console.error('An error occurred while fetching data.', error)
    return <div>Something went wrong while fetching data. Please try again later.</div>
  }
}