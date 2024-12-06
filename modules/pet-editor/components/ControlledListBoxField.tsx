import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { IoChevronDown } from 'react-icons/io5'
import { Controller, Control, Path, FieldValues, PathValue } from 'react-hook-form'

interface ListBoxProps<T extends FieldValues> {
  control: Control<T>
  fieldKey: Path<T>
  multiple?: boolean
  options: { value: PathValue<T, Path<T>>; label: string }[]
  label: string
}

export const ControlledListBoxField = <T extends FieldValues>({
  control,
  fieldKey,
  multiple,
  options,
  label,
}: ListBoxProps<T>) => {
  return (
    <Controller
      name={fieldKey}
      control={control}
      render={({ field: { value, onChange } }) => {
        const currentLabel =
          options.find((option) => option.value === value)?.label || 'Указать ...'
        console.log(currentLabel)
        return (
          <div className="mb-3 flex w-full items-center">
            <label className="w-1/4">{label}</label>

            <Listbox value={value} onChange={onChange} multiple={multiple}>
              <ListboxButton className="relative flex w-3/4 items-center justify-between rounded p-2.5 text-left ring-1 ring-inset ring-stone-700/60 dark:ring-stone-400/50">
                <div>{currentLabel}</div>
                <IoChevronDown className="pointer-events-none block size-4" aria-hidden="true" />
              </ListboxButton>
              <ListboxOptions
                anchor={'bottom'}
                className={clsx(
                  'w-[var(--button-width)] rounded bg-stone-100 p-2 ring-1 ring-stone-700/60 dark:bg-gray-600 dark:ring-stone-400/50',
                  'shadow-lg transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    value={option.value}
                    className="group flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 ring-inset ring-orange-600 focus:ring-2 data-[selected]:text-orange-500"
                  >
                    <div>{option.label}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        )
      }}
    />
  )
}
