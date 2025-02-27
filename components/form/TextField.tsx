import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { PetCreateInputData, PetUpdateInputData } from '@/types/pet'

interface TextInputProps<FormData extends FieldValues> {
  label: string
  name: Path<FormData>
  placeholder?: string
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
}

export const TextField = <FormData extends FieldValues>({
  label,
  name,
  register,
  errors,
  ...rest
}: TextInputProps<FormData>) => {
  const error = errors?.[name]?.message as string | undefined
  console.log(error)
  return (
    <Field className="mb-3 flex w-full items-center">
      <Label className="w-1/4">{label}:</Label>
      <Input
        type="text"
        {...rest}
        {...register(name)}
        className={clsx(
          'ms-auto w-3/4 shrink-0 rounded border-0 bg-transparent ring-1 ring-inset ring-stone-700/60 dark:ring-stone-400/50',
          'data-[focus]:ring-2 data-[focus]:ring-orange-600 dark:placeholder-gray-400 dark:data-[focus]:ring-orange-600'
        )}
      />
      {error && <span className="text-red-500">{error}</span>}
    </Field>
  )
}
