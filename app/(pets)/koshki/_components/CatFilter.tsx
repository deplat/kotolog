import { useState } from 'react'
import { IoCheckmark } from 'react-icons/io5'
import { Checkbox, Field, Fieldset, Label, Legend } from '@headlessui/react'
import clsx from 'clsx'

type FilterProps = {
  uniqueColors: string[]
  toggleFilter: () => void
  onFilterChange: (filters: {
    gender?: string
    furType?: string
    colors?: string[]
    age?: string
  }) => void
}

export const CatFilter = ({ uniqueColors, onFilterChange, toggleFilter }: FilterProps) => {
  const [filters, setFilters] = useState({
    gender: '',
    furType: '',
    colors: [] as string[],
    age: '',
  })
  const catAgeGroup = ageGroup == 'Молодой' ? 'Котёнок' : ageGroup

  const applyFilters = () => {
    onFilterChange(filters)
    toggleFilter()
  }

  const resetFilters = () => {
    setFilters({ gender: '', furType: '', colors: [], age: '' })
    onFilterChange({})
  }

  const updateFilters = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value, // Toggle for single-value fields
    }))
  }

  const updateColorsFilter = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color], // Toggle for multi-value fields
    }))
  }

  const renderCheckbox = (
    key: keyof typeof filters,
    value: string,
    label: string,
    isMultiValue: boolean = false
  ) => (
    <Field className="flex items-center space-x-2">
      <Checkbox
        checked={isMultiValue ? filters[key].includes(value) : filters[key] === value}
        onChange={() => (isMultiValue ? updateColorsFilter(value) : updateFilters(key, value))}
        className="group size-6 rounded-md bg-gray-800/15 p-0.5 ring-1 ring-inset ring-white/15 data-[checked]:bg-orange-500 data-[checked]:text-white dark:data-[checked]:bg-orange-600"
      >
        <IoCheckmark className="hidden size-5 group-data-[checked]:block" />
      </Checkbox>
      <Label className="dark:text-stone-300">{label}</Label>
    </Field>
  )

  return (
    <div
      className={clsx(
        'flex h-full flex-col p-4 shadow-lg md:h-fit md:max-h-screen md:rounded-bl-3xl md:rounded-tl-3xl',
        'bg-white backdrop-blur-xl dark:bg-gray-700/85 dark:ring-1 dark:ring-inset dark:ring-gray-50/15'
      )}
    >
      {/* Gender Filter */}
      <div className="flex-1 overflow-y-auto px-2">
        <Fieldset className="mb-4 flex flex-col space-y-2">
          <Legend className="font-semibold">Пол</Legend>
          {renderCheckbox('gender', 'MALE', 'Кот')}
          {renderCheckbox('gender', 'FEMALE', 'Кошка')}
        </Fieldset>

        {/* Age Filter */}
        <Fieldset className="mb-4 flex flex-col space-y-2">
          <Legend className="font-semibold">Возраст</Legend>
          {renderCheckbox('age', 'kitten', 'Котёнок (до 1 года)')}
          {renderCheckbox('age', 'cat', 'Взрослый')}
        </Fieldset>

        {/* Fur Type Filter */}
        <Fieldset className="mb-4 flex flex-col space-y-2">
          <Legend className="font-semibold">Тип шерсти</Legend>
          {renderCheckbox('furType', 'SHORT', 'Гладкошёрстный')}
          {renderCheckbox('furType', 'LONG', 'Длинношёрстный')}
        </Fieldset>

        {/* Colors Filter */}
        <Fieldset className="mb-4 flex flex-col space-y-2">
          <Legend className="font-semibold">Окрас</Legend>
          {uniqueColors.map((color) => (
            <div key={color}>{renderCheckbox('colors', color, color, true)}</div>
          ))}
        </Fieldset>
      </div>
      <hr className="border-cool-grey-200 border" />
      {/* Apply and Reset Buttons */}
      <div className="mt-2 flex space-x-2">
        <button
          type="button"
          onClick={applyFilters}
          className="p-1 font-semibold text-green-500 hover:text-green-600 dark:hover:text-green-600"
        >
          Применить
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="p-1 font-semibold text-red-400 hover:text-red-500 dark:hover:text-red-500"
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}
