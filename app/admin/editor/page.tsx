import { getCachedColors, getCachedPets } from './(data-access)'
import { Dashboard } from './(modules)'

export default async function EditorPage() {
  try {
    const pets = await getCachedPets()
    const colors = await getCachedColors()
    return <Dashboard pets={pets} colors={colors} />
  } catch (error) {
    return <div>Something went wrong while fetching data., {(error as Error).message}</div>
  }
}
