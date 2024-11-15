'use client'

import { useEffect, useState } from 'react'
import { Checkbox, Field, Fieldset, Label, Legend } from '@headlessui/react'
import { IoCheckmark } from 'react-icons/io5'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import {
  localizedFilterNames,
  localizedAgeGroup,
  localizedFurType,
} from '@/app/(pets)/sobaki/localizedFilterNamesAndOptions'

export const DogFilters = ({
  availableDogGenders,
  availableDogAgeGroups,
  availableDogFurTypes,
  availableDogColors,
}: {
  availableDogGenders: string[]
  availableDogAgeGroups: string[]
  availableDogFurTypes: string[]
  availableDogColors: string[]
}) => {
  const searchParams = useSearchParams()

  const getFiltersFromSearchParams = () => {
    const gender = searchParams.get('gender') || ''
    const ageGroup = searchParams.get('ageGroup') || ''
    const furType = searchParams.getAll('furType') || []
    const color = searchParams.getAll('color') || []
    return { gender, ageGroup, furType, color }
  }

  const [filters, setFilters] = useState<{
    gender: string
    ageGroup: string
    furType: string[]
    color: string[]
  }>({
    gender: '',
    ageGroup: '',
    furType: [],
    color: [],
  })

  useEffect(() => {
    const initialFilters = getFiltersFromSearchParams()
    setFilters(initialFilters)
  }, [searchParams])

  const updateFilters = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      return { ...prev, [key]: prev[key] === value ? '' : value }
    })
  }

  const updateMultiValueFilter = (
    key: keyof { furType: string[]; color: string[] },
    value: string
  ) => {
    setFilters((prev) => {
      const updatedValues = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value]
      return { ...prev, [key]: updatedValues }
    })
  }

  const checkIfSingleOption = (options: string[]) => options.length === 1
  const checkIfTwoOptions = (options: string[]) => options.length === 2
  const checkIfMultipleOptions = (options: string[]) => options.length > 2

  const renderFilterOptions = (
    key: keyof typeof filters,
    options: string[],
    localized: (value: string) => string
  ) => {
    if (!options.length) return null

    const isSingleOption = checkIfSingleOption(options)
    const isTwoOptions = checkIfTwoOptions(options)
    const isMultipleOptions = checkIfMultipleOptions(options)

    return (
      <div>
        <Fieldset className="space-y-2">
          <Legend className="mb-2 text-lg font-semibold">{localizedFilterNames[key]}</Legend>
          {options.map((value) => (
            <div key={value}>
              <Field className="flex items-center space-x-2">
                <Checkbox
                  name={key}
                  value={value}
                  checked={
                    isMultipleOptions ? filters[key].includes(value) : filters[key] === value
                  }
                  onChange={() =>
                    isMultipleOptions
                      ? updateMultiValueFilter(
                          key as keyof { furType: string[]; color: string[] },
                          value
                        )
                      : updateFilters(key, value)
                  }
                  disabled={
                    (isSingleOption && !filters[key]) ||
                    (isTwoOptions && filters[key] === value && filters[key].length === 1)
                  }
                  className="group size-6 rounded-md bg-gray-800/15 p-0.5 ring-1 ring-inset ring-white/15 data-[checked]:bg-orange-500 data-[checked]:text-white dark:data-[checked]:bg-orange-600"
                >
                  <IoCheckmark
                    className={clsx(
                      'size-5 group-data-[checked]:block',
                      isSingleOption ? 'block opacity-50' : 'hidden'
                    )}
                  />
                </Checkbox>
                <Label className="dark:text-stone-300">{localized(value)}</Label>
              </Field>
            </div>
          ))}
        </Fieldset>
      </div>
    )
  }

  const sortOptions = (options: string[], order: string[]) => {
    return options.sort((a, b) => {
      const indexA = order.indexOf(a)
      const indexB = order.indexOf(b)
      return indexA - indexB
    })
  }

  return (
    <div className="space-y-4">
      {renderFilterOptions(
        'gender',
        sortOptions(availableDogGenders, ['MALE', 'FEMALE']),
        (value) => (value === 'MALE' ? 'Мальчик' : 'Девочка')
      )}
      {renderFilterOptions(
        'ageGroup',
        sortOptions(availableDogAgeGroups, ['PUPPY', 'ADULT']),
        localizedAgeGroup
      )}
      {renderFilterOptions(
        'furType',
        sortOptions(availableDogFurTypes, ['SHORT', 'MEDIUM', 'LONG', 'HAIRLESS']),
        localizedFurType
      )}
      {renderFilterOptions('color', availableDogColors, (color) => color)}
    </div>
  )
}
