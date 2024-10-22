import { Control, Controller, DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form'
import { Checkbox, Field, Label } from '@headlessui/react'
import clsx from 'clsx'

import { IoCheckmark } from 'react-icons/io5'
import { PetData } from '@/types'

export const ControlledCheckbox = ({
  control,
  errors,
  fieldKey,
  label,
}: {
  control: Control<PetData>
  errors: Partial<FieldErrorsImpl<DeepRequired<PetData>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
  fieldKey: any
  label: string
}) => {
  return (
    <Controller
      control={control}
      name={fieldKey}
      render={({ field }) => (
        <Field className="flex w-full items-center space-x-4">
          <Checkbox
            checked={field.value}
            onChange={field.onChange}
            className={clsx(
              'group size-6 rounded-md bg-gray-800/15 p-0.5 ring-1 ring-inset ring-white/15',
              'date-[checked]:bg-orange-500 data-[checked]:text-white dark:data-[checked]:bg-orange-600'
            )}
          >
            <IoCheckmark className="hidden size-5 group-data-[checked]:block" />
          </Checkbox>
          <Label className="dark:text-stone-300">{label}</Label>
          {errors[fieldKey as keyof PetData] && <p>{errors[fieldKey as keyof PetData]?.message}</p>}
        </Field>
      )}
    />
  )
}
