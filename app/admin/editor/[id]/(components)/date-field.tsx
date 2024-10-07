import { Field, Input, Label } from '@headlessui/react'
import { Control, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { PetData } from '@/types'
import 'react-datepicker/dist/react-datepicker.css'

export const DateField = ({ label, control }: { label: string; control: Control<PetData> }) => {
  return (
    <Field className="flex w-full items-center justify-center">
      <Label>{label}</Label>
      <Input as="div">
        <Controller
          control={control}
          name="birthDate"
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
