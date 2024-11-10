import { FieldError, UseFormRegister } from 'react-hook-form'
import { PetData } from '@/types'
import { Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

export const TextField = ({
  label,
  register,
  errors,
}: {
  label: string
  register: ReturnType<UseFormRegister<PetData>>
  errors: FieldError | undefined
}) => {
  return (
    <Field className="mb-3 flex w-full items-center">
      <Label className="w-1/4">{label}:</Label>
      <Input
        type="text"
        placeholder={`Укажите ${label}`}
        {...register}
        className={clsx(
          'ms-auto w-3/4 shrink-0 border-0 bg-transparent',
          'data-[focus]:ring-2 data-[focus]:ring-orange-600'
        )}
      />
      {errors && <span className="text-red-500">{errors.message}</span>}
    </Field>
  )
}
