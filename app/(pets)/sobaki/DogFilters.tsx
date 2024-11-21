'use client'

import { useState } from 'react'
import { Checkbox, Field, Fieldset, Label, Legend } from '@headlessui/react'
import { IoCheckmark } from 'react-icons/io5'
import clsx from 'clsx'
import {
  localizedFilterNames,
  localizedAgeGroup,
  localizedFurType,
} from '@/app/(pets)/sobaki/localizedFilterNamesAndOptions'

type Filters = {
  [key in 'furType' | 'gender' | 'ageGroup' | 'colors']: string[]
}

export const DogFilters = ({
  availableDogGenders,
  availableDogAgeGroups,
  availableDogFurTypes,
  availableDogColors,
  initialFilters,
}: {
  availableDogGenders: string[]
  availableDogAgeGroups: string[]
  availableDogFurTypes: string[]
  availableDogColors: string[]
  initialFilters: Filters
}) => {
  const [formState, setFormState] = useState<Filters>(initialFilters)

  const updateFilters = (key: keyof Filters, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }))
  }

  const renderFilterOptions = (
    key: string,
    options: string[],
    localized: (value: string) => string
  ) => {
    if (!options.length) return null

    const isSingleOption = options.length === 1
    const isTwoOptions = options.length === 2
    const isMultipleOptions = options.length > 2

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
                    isMultipleOptions ? formState[key].includes(value) : formState[key] === value
                  }
                  onChange={() => updateFilters(key, value)}
                  disabled={
                    isSingleOption ||
                    (isTwoOptions && formState[key].includes(value) && formState[key].length === 1)
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
    return options.sort((a, b) => order.indexOf(a) - order.indexOf(b))
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
