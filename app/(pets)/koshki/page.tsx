import { GiCat } from 'react-icons/gi'
import { Suspense } from 'react'
import { FilterSidebar } from '@/app/(pets)/sobaki/FilterSidebar'
import { getCachedCats } from '@/data-access'
import { CatList } from '@/app/(pets)/koshki/_components/CatList'

export default async function CatsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  const params = await searchParams
  console.info(params)
  await getCachedCats(params).then(({ success, data }) => {
    if (!data) return <>Can't get cats</>
    return (
      <div className="w-full px-3 py-[15vh] sm:px-6">
        <div className="flex w-full items-center">
          <GiCat size={36} className="me-2 text-gray-500 dark:text-gray-400 md:me-4" />
          <h1 className="text-4xl font-bold">Cats</h1>
          <Suspense>
            <FilterSidebar>
              <>
                {/*
                <DogFilters
                  availableDogGenders={availableDogGenders}
                  availableDogFurTypes={availableDogFurTypes}
                  availableDogAgeGroups={availableDogAgeGroups}
                  availableDogColors={availableDogColors}
                />
                */}
              </>
            </FilterSidebar>
          </Suspense>
        </div>
        <Suspense>
          <CatList cats={data} />
        </Suspense>
      </div>
    )
  })
}
