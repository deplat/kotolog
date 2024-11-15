import { GiSittingDog } from 'react-icons/gi'
import { DogFilters } from '@/app/(pets)/sobaki/DogFilters'
import { FilterSidebar } from '@/app/(pets)/sobaki/FilterSidebar'
import { Suspense } from 'react'

export const DogListLayout = async ({
  availableDogGenders,
  availableDogFurTypes,
  availableDogAgeGroups,
  availableDogColors,
  children,
}: {
  availableDogGenders: string[]
  availableDogFurTypes: string[]
  availableDogAgeGroups: string[]
  availableDogColors: string[]
  children: React.ReactNode
}) => {
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
      {children}
    </div>
  )
}
