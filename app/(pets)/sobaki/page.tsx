import { getCachedDogs, getCachedListOfUniqueColorsFromDogs } from '@/data-access'
import { DogList } from '@/app/(pets)/sobaki/DogList'

export default async function DogsPage() {
  const dogs = await getCachedDogs()
  const colors = await getCachedListOfUniqueColorsFromDogs()
  return <DogList initialDogs={dogs} uniqueColorsFromDogs={colors} />
}
