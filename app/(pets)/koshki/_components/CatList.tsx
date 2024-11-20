'use server'

import Image from 'next/image'
import { Cats, getCachedCats } from '@/data-access'
import clsx from 'clsx'
import { FormattedPetData } from '@/types'

export const CatList = async ({ cats }: { cats: FormattedPetData[] }) => {
  if (cats.length === 0) {
    return <>There are no cats yet</>
  }
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
        {cats.map((cat) => (
          <div
            key={cat.id}
            className={clsx(
              'relative flex flex-col rounded-lg bg-white shadow-xl',
              'backdrop-blur-xl dark:bg-gray-700/15 dark:ring-1 dark:ring-inset dark:ring-stone-50/10'
            )}
          >
            <div className="aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-t-lg sm:shadow-md">
              <Image src={cat.avatar?.src || ''} alt={cat.name} fill />
            </div>
            <div className="my-4 text-center">
              <h3 className="truncate text-wrap text-xl font-semibold lg:text-2xl">
                <a href={`/koshki/${cat.slug}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {cat.name}
                </a>
              </h3>
              <p className="text-nowrap text-lg md:mt-1 lg:text-xl">{cat.ageString}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
