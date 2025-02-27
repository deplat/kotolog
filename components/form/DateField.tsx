import { Field, Input, Label } from '@headlessui/react'
import {
  Path,
  FieldValues,
  PathValue,
  Control,
  useController,
  FieldErrors,
  FieldError,
} from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateFieldProps<T extends FieldValues> {
  control: Control<T>
  fieldKey: Path<T>
  label: string
  errors: FieldError | undefined
}

export const DateField = <T extends FieldValues>({
  control,
  fieldKey,
  label,
  errors,
}: DateFieldProps<T>) => {
  const { field } = useController({
    name: fieldKey,
    control,
  })
  return (
    <Field className="mb-3 flex w-full flex-col items-center">
      <div className="flex">
        <Label className="w-1/4">{label}</Label>
        <Input as="div" className="w-3/4">
          <DatePicker
            selected={field.value} // Ensure valid value
            onChange={(date) => {
              if (date instanceof Date) {
                field.onChange(date as PathValue<T, Path<T>>)
              }
            }}
            dateFormat="dd.MM.yyyy"
            placeholderText="дд.ММ.гггг"
            className="flex w-full shrink-0 rounded border-0 bg-transparent ring-1 ring-inset ring-stone-700/60 focus:ring-2 focus:ring-orange-600 dark:placeholder-gray-400 dark:ring-stone-400/50 dark:focus:ring-orange-600"
          />
        </Input>
      </div>
      {errors && <div className="text-red-500">{errors.message}</div>}
    </Field>
  )
}
