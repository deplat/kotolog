'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Color } from '@/types'
import { Button, Field, Input, Label } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { createColor, getColorByName, updateColor } from '@/data-access'
import { useRouter } from 'next/navigation'

export const ColorEditor = ({ color }: { color: Color | null }) => {
  const [feedback, setFeedback] = useState<string | null>(null)
  const router = useRouter()
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
          setError('name', { type: 'custom', message: 'Цвет с таким названием уже существует.' })
        } else {
          clearErrors('name')
        }
      } catch (error) {
        setError('name', { type: 'custom', message: 'Не удалось проверить название.' })
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
      const { success, message } = await createColor(formData.name)
      if (success) {
        setFeedback('Окрас добавлен успешно.')
        router.push('/admin/colors')
      } else {
        setFeedback(message)
      }
    } else {
      const { success, message } = await updateColor(color.id, formData.name)
      if (success) {
        setFeedback('Окрас обновлён успешно.')
        router.push('/admin/colors')
      } else {
        setFeedback('Не удалось добавить окрас:' + message)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-3 rounded bg-stone-100 p-3"
    >
      <Field className="flex w-full items-center gap-x-2">
        <Label className="w-1/4">Название:</Label>
        <Input
          type="text"
          {...register('name', { required: 'Укажите название окраса.' })}
          placeholder="Введите название окраса..."
          aria-invalid={!!errors.name}
          className="w-3/4 rounded border-0 bg-stone-200 focus:ring-orange-600"
        />
      </Field>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      {feedback && <p className="text-blue-500">{feedback}</p>}

      <div className="ms-auto flex gap-x-2">
        <Button type="submit" className="rounded bg-gray-500 px-4 py-2.5 text-stone-100">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
