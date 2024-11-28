import { useFormContext } from 'react-hook-form'
import { Checkbox, Field, Label } from '@headlessui/react'

import { IoCheckmark } from 'react-icons/io5'

export const ControlledCheckbox = ({ fieldKey, label }: { fieldKey: any; label: string }) => {
  const { setValue, getValues } = useFormContext()
  return (
    <Field className="flex w-full items-center space-x-4">
      <Checkbox
        checked={getValues(fieldKey)}
        onChange={(value) => setValue(fieldKey, value)}
        className="checkbox group"
      >
        <IoCheckmark className="checkbox-icon" />
      </Checkbox>
      <Label className="cursor-pointer dark:text-stone-300">{label}</Label>
    </Field>
  )
}
