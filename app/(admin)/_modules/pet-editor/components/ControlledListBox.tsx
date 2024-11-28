import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import clsx from 'clsx'
import { IoCheckmark, IoChevronDown } from 'react-icons/io5'
import { useFormContext } from 'react-hook-form'

export const ControlledListBox = ({
  fieldLabel,
  fieldKey,
  options,
}: {
  fieldLabel: string
  fieldKey: any
  options: { value: any; label: string }[]
}) => {
  const { setValue, getValues } = useFormContext()
  return (
    <Field className="mb-3 flex w-full items-center">
      <Label className="w-1/4">{fieldLabel}</Label>

      <Listbox value={getValues(fieldKey)} onChange={(value) => setValue(fieldKey, value)}>
        <ListboxButton className="relative flex w-3/4 items-center justify-between rounded p-2.5 text-left ring-1 ring-inset ring-stone-700/60 dark:ring-stone-400/50">
          <div>{getValues(fieldKey) == null ? 'Указать ...' : getValues(fieldKey)}</div>
          <IoChevronDown className="pointer-events-none block size-4" aria-hidden="true" />
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: 'bottom', gap: 4 }}
          transition
          className={clsx(
            'w-[var(--button-width)] rounded bg-stone-100 p-2 ring-1 ring-stone-700/60 dark:bg-gray-600 dark:ring-stone-400/50',
            'shadow-lg transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.label}
              value={option.value}
              className="group flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 ring-inset ring-orange-600 data-[focus]:ring-2"
            >
              <IoCheckmark className="invisible size-5 data-[selected]:text-orange-600 group-data-[selected]:visible" />
              <div className="">{option.label}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  )
}
