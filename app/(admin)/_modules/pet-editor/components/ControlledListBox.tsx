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
import { Control, Controller } from 'react-hook-form'
import { PetData } from '@/types'

export const ControlledListBox = ({
  fieldLabel,
  fieldKey,
  options,
  control,
}: {
  fieldLabel: string
  fieldKey: any
  options: { value: any; label: string }[]
  control: Control<PetData>
}) => {
  return (
    <Field className="mb-3 flex w-full items-center">
      <Label className="w-1/4">{fieldLabel}</Label>
      <Controller
        control={control}
        name={fieldKey}
        render={({ field }) => (
          <Listbox value={field.value} onChange={field.onChange}>
            <ListboxButton className={clsx('relative block w-3/4 p-3 text-left')}>
              {field.value == null ? 'Указать...' : field.value}
              <IoChevronDown
                className="group pointer-events-none absolute right-2.5 top-2.5 size-4"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                'border border-stone-950 bg-stone-100 p-2 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
              )}
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.label}
                  value={option.value}
                  className="group flex cursor-pointer items-center gap-2 px-3 py-1.5 ring-inset ring-orange-500 data-[focus]:ring-2"
                >
                  <IoCheckmark className="invisible size-5 group-data-[selected]:visible" />
                  <div className="">{option.label}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        )}
      />
    </Field>
  )
}
