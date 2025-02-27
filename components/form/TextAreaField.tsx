import { Field, Label, Textarea } from '@headlessui/react'
import { UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'
import { PetCreateInputData, PetUpdateInputData } from '@/types/pet'

export const TextAreaField = ({
  label,
  placeholder,
  register,
}: {
  label: string
  placeholder: string
  register: ReturnType<UseFormRegister<PetCreateInputData | PetUpdateInputData>>
}) => {
  return (
    <Field className="mb-6 flex w-full flex-col gap-y-2">
      <Label className="mb-3 text-2xl">{label}:</Label>
      <Textarea
        {...register}
        placeholder={placeholder}
        className={clsx(
          'min-h-64 w-full rounded border-0 bg-transparent ring-1 ring-inset ring-stone-950 dark:ring-stone-400/60',
          'data-[focus]:ring-inset data-[focus]:ring-orange-600 dark:data-[focus]:ring-orange-600'
        )}
      />
    </Field>
  )
}
