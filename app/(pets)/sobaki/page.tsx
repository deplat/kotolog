import {
  getCachedDogs,
  getCachedAvailableDogGenders,
  getCachedAvailableDogColors,
  getCachedAvailableDogFurTypes,
  getCachedAvailableDogAgeGroups,
} from '@/data-access'
import { DogList } from '@/app/(pets)/sobaki/DogList'
import { GiSittingDog } from 'react-icons/gi'
import { Suspense } from 'react'
import { FilterSidebar } from '@/app/(pets)/sobaki/FilterSidebar'
import { DogFilters } from '@/app/(pets)/sobaki/DogFilters'

export default async function DogsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  const params = await searchParams
  console.log(params)
  const availableDogGenders = await getCachedAvailableDogGenders()
  const availableDogFurTypes = await getCachedAvailableDogFurTypes()
  const availableDogAgeGroups = await getCachedAvailableDogAgeGroups()
  const availableDogColors = await getCachedAvailableDogColors()
  await getCachedDogs(params).then(({ success, message, data }) => {
    if (!success) {
      console.log(message)
      return <>{message}</>
    } else {
      return (
        <div className="w-full px-3 py-[15vh] sm:px-6">
          <div className="flex w-full items-center">
            <GiSittingDog size={36} className="me-2 text-gray-500 dark:text-gray-400 md:me-4" />
            <h1 className="text-4xl font-bold">Собаки</h1>
            <Suspense>
              <FilterSidebar>
                <DogFilters
                  availableDogGenders={availableDogGenders}
                  availableDogFurTypes={availableDogFurTypes}
                  availableDogAgeGroups={availableDogAgeGroups}
                  availableDogColors={availableDogColors}
                />
              </FilterSidebar>
            </Suspense>
          </div>
          <Suspense>
            <DogList dogs={data} />
          </Suspense>
        </div>
      )
    }
  })
}
