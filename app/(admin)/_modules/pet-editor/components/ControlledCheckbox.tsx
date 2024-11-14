import { Control, Controller, DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form'
import { Checkbox, Field, Label } from '@headlessui/react'

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
          <Checkbox checked={field.value} onChange={field.onChange} className="checkbox group">
            <IoCheckmark className="checkbox-icon" />
          </Checkbox>
          <Label className="cursor-pointer dark:text-stone-300">{label}</Label>
          {errors[fieldKey as keyof PetData] && <p>{errors[fieldKey as keyof PetData]?.message}</p>}
        </Field>
      )}
    />
  )
}
