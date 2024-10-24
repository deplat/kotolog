import { Field, Label, Textarea } from '@headlessui/react'
import { PetData } from '@/types'
import { UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'

export const TextareaField = ({
  label,
  register,
}: {
  label: string
  register: ReturnType<UseFormRegister<PetData>>
}) => {
  return (
    <Field className="mb-6 flex w-full flex-col gap-y-2 border border-stone-950 p-3 sm:p-6">
      <Label className="mb-3 text-2xl">{label}:</Label>
      <Textarea
        {...register}
        placeholder={'History of this pet'}
        className={clsx(
          'min-h-64 w-full border-0 bg-transparent ring-1 ring-inset ring-stone-950',
          'data-[focus]:ring-inset data-[focus]:ring-orange-600'
        )}
      />
    </Field>
  )
}
