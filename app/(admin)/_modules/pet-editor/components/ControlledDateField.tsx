import { Field, Input, Label } from '@headlessui/react'
import { useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const ControlledDateField = ({ fieldKey, label }: { fieldKey: string; label: string }) => {
  const { setValue, getValues } = useFormContext()
  return (
    <Field className="mb-3 flex w-full items-center">
      <Label className="w-1/4">{label}</Label>
      <Input as="div" className="w-3/4">
        <DatePicker
          selected={getValues(fieldKey)}
          onChange={(date) => setValue(fieldKey, date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="yyyy-MM-dd"
          className="flex w-full shrink-0 rounded border-0 bg-transparent ring-1 ring-inset ring-stone-700/60 focus:ring-2 focus:ring-orange-600 dark:placeholder-gray-400 dark:ring-stone-400/50 dark:focus:ring-orange-600"
        />
      </Input>
    </Field>
  )
}
