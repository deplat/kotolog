import { Field, Input, Label } from '@headlessui/react'
import { Control, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { PetData } from '@/types'
import 'react-datepicker/dist/react-datepicker.css'

export const ControlledDateField = ({
  label,
  fieldKey,
  control,
}: {
  label: string
  fieldKey: any
  control: Control<PetData>
}) => {
  return (
    <Field className="mb-1 flex w-full items-center">
      <Label className="w-1/4">{label}</Label>
      <Input as="div" className="w-3/4">
        <Controller
          control={control}
          name={fieldKey}
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="yyyy-MM-dd"
              className="flex w-full shrink-0 border-0 bg-transparent focus:ring-2 focus:ring-orange-600"
            />
          )}
        />
      </Input>
    </Field>
  )
}
