import {
  getCachedAvailableDogGenders,
  getCachedAvailableDogColors,
  getCachedAvailableDogFurTypes,
  getCachedAvailableDogAgeGroups,
} from '@/data-access'
import { DogListLayout } from '@/app/(pets)/sobaki/DogListLayout'
import { DogList } from '@/app/(pets)/sobaki/DogList'

export default async function DogsPage() {
  const availableDogGenders = await getCachedAvailableDogGenders()
  const availableDogFurTypes = await getCachedAvailableDogFurTypes()
  const availableDogAgeGroups = await getCachedAvailableDogAgeGroups()
  const availableDogColors = await getCachedAvailableDogColors()

  return (
    <DogListLayout
      availableDogGenders={availableDogGenders}
      availableDogFurTypes={availableDogFurTypes}
      availableDogAgeGroups={availableDogAgeGroups}
      availableDogColors={availableDogColors}
    >
      <DogList />
    </DogListLayout>
  )
}
