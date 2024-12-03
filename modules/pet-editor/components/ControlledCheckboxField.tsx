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
              className="group size-6 rounded p-0.5 ring-1 ring-inset ring-stone-950 transition duration-75 data-[checked]:bg-orange-500 data-[checked]:text-white data-[checked]:ring-orange-500 dark:ring-stone-400/50 dark:data-[checked]:bg-orange-600"
            >
              <IoCheckmark className="hidden size-5 group-data-[checked]:block group-data-[hover]:block" />
            </Checkbox>
            <Label className="cursor-pointer dark:text-stone-300">{label}</Label>
          </Field>
        )}
      />
    </>
  )
}
