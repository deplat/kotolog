import { Description, Field, Label, Textarea } from '@headlessui/react'
import { PetData } from '@/types'
import { UseFormRegister } from 'react-hook-form'

export const TextareaField = ({ register }: { register: ReturnType<UseFormRegister<PetData>> }) => {
  return (
    <Field className="flex w-full flex-col space-y-2">
      <Label className="text-2xl">Biography</Label>
      <Description>An extra information about pet</Description>
      <Textarea
        {...register}
        className={
          'min-h-64 border-0 bg-transparent ring-inset' +
          'data-[focus]:bg-black/75 data-[focus]:ring-1 data-[focus]:ring-orange-700'
        }
      />
    </Field>
  )
}