'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Color } from '@/types'
import { Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

export const ColorEditor = ({ color, close }: { color: Color | null; close: () => void }) => {
  const { register, handleSubmit } = useForm<Color>({
    defaultValues: { name: color?.name },
  })
  const handleClose = () => close()

  const onSubmit: SubmitHandler<Color> = async (data) => {
    console.log('Color data:', data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <Field className="flex w-full items-center">
        <Label>Name:</Label>
        <Input type="text" {...register('name', { required: 'Name is required' })} />
      </Field>
      <Button onClick={handleClose}>Cancel</Button>
      <Button
        type="submit"
        className={clsx(
          'ms-auto border border-stone-950 bg-stone-100 px-4 py-2.5 underline-offset-4',
          'hover:text-stone-100 hover:underline data-[hover]:bg-stone-950'
        )}
      >
        Save
      </Button>
    </form>
  )
}
