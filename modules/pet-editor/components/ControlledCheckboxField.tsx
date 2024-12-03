import { Checkbox, Field, Label } from '@headlessui/react'
import { IoCheckmark } from 'react-icons/io5'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface ControlledCheckboxFieldProps<T extends FieldValues> {
  control: Control<T>
  fieldKey: Path<T>
  label: string
}

export const ControlledCheckboxField = <T extends FieldValues>({
  control,
  fieldKey,
  label,
}: ControlledCheckboxFieldProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={fieldKey}
        render={({ field }) => (
          <Field className="mb-2 flex items-center space-x-2" key={fieldKey}>
            <Checkbox
              checked={field.value as boolean}
              onChange={field.onChange}
              className="checkbox group"
            >
              <IoCheckmark className="checkbox-icon" />
            </Checkbox>
            <Label className="cursor-pointer dark:text-stone-300">{label}</Label>
          </Field>
        )}
      />
    </>
  )
}
