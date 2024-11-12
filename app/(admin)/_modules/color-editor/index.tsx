'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Color } from '@/types'
import { Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { createColor, getColorByName, updateColor } from '@/data-access'

export const ColorEditor = ({ color }: { color: Color | null }) => {
  const [feedback, setFeedback] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Color>({
    defaultValues: { name: color?.name },
  })
  const watchName = watch('name')

  useEffect(() => {
    const checkName = async (name: string, id?: number) => {
      try {
        const existingColor = await getColorByName(name)
        if (existingColor && existingColor.id !== id) {
          setError('name', { type: 'custom', message: 'Name is already in use' })
        } else {
          clearErrors('name')
        }
      } catch (error) {
        setError('name', { type: 'custom', message: 'Cannot check name' })
      }
    }

    if (watchName) {
      checkName(watchName, color?.id).then()
    }
  }, [clearErrors, setError, watchName])

  const onSubmit: SubmitHandler<Color> = async (formData) => {
    if (errors.name) {
      console.log(errors.name)
      return
    }

    if (!color) {
      const { success, message, data } = await createColor(formData.name)
      if (success) {
        console.log('Color created:', data)
        setFeedback('Color created successfully.')
      } else {
        setFeedback(message)
      }
    } else {
      const { success, message, data } = await updateColor(color.id, formData.name)
      if (success) {
        console.log('Color updated:', message, data)
        setFeedback(message)
      } else {
        setFeedback('Failed to update color.' + message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <Field className="flex w-full items-center gap-x-2">
        <Label>Name:</Label>
        <Input
          type="text"
          {...register('name', { required: 'Name is required' })}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </Field>

      {feedback && <p className="text-blue-500">{feedback}</p>}

      <div className="ms-auto flex gap-x-2">
        <Button
          className={clsx('px-4 py-2.5 underline-offset-4', 'text-red-600 data-[hover]:underline')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={clsx(
            'border border-stone-950 bg-stone-100 px-4 py-2.5 underline-offset-4',
            'hover:text-stone-100 hover:underline data-[hover]:bg-stone-950'
          )}
        >
          Save
        </Button>
      </div>
    </form>
  )
}
