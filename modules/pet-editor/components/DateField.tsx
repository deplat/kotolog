import { Field, Input, Label } from '@headlessui/react'
import { useFormContext, Path, FieldValues, PathValue } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'

interface DateFieldProps<T extends FieldValues> {
  fieldKey: Path<T>
  label: string
}

export const DateField = <T extends FieldValues>({ fieldKey, label }: DateFieldProps<T>) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<T>()
  const [currentValue, setCurrentValue] = useState(getValues(fieldKey))

  return (
    <Field className="mb-3 flex w-full items-center">
      <Label className="w-1/4">{label}</Label>
      <Input as="div" className="w-3/4">
        <DatePicker
          selected={currentValue || null} // Ensure valid value
          onChange={(date) => {
            if (date instanceof Date) {
              setCurrentValue(date as PathValue<T, Path<T>>)
              setValue(fieldKey, date as PathValue<T, Path<T>>)
            }
          }}
          dateFormat="dd.MM.yyyy"
          placeholderText="дд.ММ.гггг"
          className="flex w-full shrink-0 rounded border-0 bg-transparent ring-1 ring-inset ring-stone-700/60 focus:ring-2 focus:ring-orange-600 dark:placeholder-gray-400 dark:ring-stone-400/50 dark:focus:ring-orange-600"
        />
      </Input>
      {errors[fieldKey] && (
        <div className="ml-4 text-red-600">
          <p>{errors[fieldKey]?.message as string}</p>
        </div>
      )}
    </Field>
  )
}
