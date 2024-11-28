'use client'

import { useState } from 'react'
import { CatFilter } from '@/app/(pets)/koshki/_components/CatFilter'
import { CatList } from '@/app/(pets)/koshki/_components/CatList'
import { IoClose, IoFilter } from 'react-icons/io5'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Cats } from '@/data-access'
import { GiCat } from 'react-icons/gi'

interface CatsListLayoutProps {
  initialCats: Cats
  uniqueColors: string[]
}

export const CatListLayout = ({ initialCats, uniqueColors }: CatsListLayoutProps) => {
  const [filteredCats, setFilteredCats] = useState(initialCats)
  const [filterVisible, setFilterVisible] = useState(false)

  const toggleFilter = () => {
    setFilterVisible(!filterVisible)
  }

  const handleFilterChange = (filters: {
    gender?: string
    furType?: string
    colors?: string[]
    age?: string
  }) => {
    let newCats = initialCats

    if (filters.gender) {
      newCats = newCats.filter((cat) => cat.gender === filters.gender)
    }

    if (filters.furType) {
      newCats = newCats.filter((cat) => cat.furType === filters.furType)
    }

    if (filters.colors && filters.colors.length > 0) {
      newCats = newCats.filter((cat) =>
        filters.colors?.some((color) => cat.colors?.some((catColor) => catColor.colorId === color))
      )
    }

    if (filters.age) {
      newCats = newCats.filter((cat) => cat.ageCategory === filters.age)
    }

    setFilteredCats(newCats)
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl px-4 py-[15vh] sm:px-6">
      <button
        className={clsx(
          'fixed bottom-5 right-5 z-50 rounded-full bg-gray-50 p-2.5 text-stone-600 shadow-lg hover:text-orange-500 md:bottom-10 md:right-10',
          'transition-(.)colors backdrop-blur-xl duration-200 dark:bg-gray-700/90 dark:text-stone-300 dark:ring-1 dark:ring-inset dark:ring-gray-50/10 dark:hover:bg-gray-700 dark:hover:text-orange-500 dark:hover:shadow-orange-500/35'
        )}
        onClick={toggleFilter}
      >
        {filterVisible ? <IoClose size={36} /> : <IoFilter size={36} />}
      </button>
      <Transition
        unmount={false}
        as="div"
        show={filterVisible}
        className={clsx(
          'fixed -right-1 bottom-0 top-0 z-50 flex h-full items-center',
          'transition data-[closed]:translate-x-full data-[enter]:duration-500 data-[leave]:duration-500'
        )}
      >
        <CatFilter
          uniqueColors={uniqueColors}
          onFilterChange={handleFilterChange}
          toggleFilter={toggleFilter}
        />
      </Transition>
      <div className="mx-auto flex w-full grow flex-col">
        <div className="mb-10 flex items-center">
          <GiCat size={36} className="mr-2 text-gray-500 dark:text-gray-400 md:mr-4" />
          <h2 className="text-4xl font-bold tracking-tight">Кошки</h2>
        </div>
        <div className="flex w-full justify-center">
          <CatList cats={filteredCats} />
        </div>
      </div>
    </div>
  )
}
