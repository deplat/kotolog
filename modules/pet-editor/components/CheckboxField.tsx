import { useFormContext, Path, FieldValues, PathValue } from 'react-hook-form'
import { Checkbox, Field, Label } from '@headlessui/react'
import { IoCheckmark } from 'react-icons/io5'

interface CheckboxFieldProps<T extends FieldValues> {
  fieldKey: Path<T>
  label: string
}

export const CheckboxField = <T extends FieldValues>({
  fieldKey,
  label,
}: CheckboxFieldProps<T>) => {
  const { setValue, watch } = useFormContext<T>()

  // Watch the current value of the checkbox field
  const isChecked = watch(fieldKey)

  return (
    <Field className="flex w-full items-center space-x-4">
      <Checkbox
        checked={isChecked as boolean} // Ensure the value is treated as a boolean
        onChange={(value: boolean) => setValue(fieldKey, value as PathValue<T, Path<T>>)}
        className="checkbox group"
      >
        <IoCheckmark className="checkbox-icon" />
      </Checkbox>
      <Label className="cursor-pointer dark:text-stone-300">{label}</Label>
    </Field>
  )
}
