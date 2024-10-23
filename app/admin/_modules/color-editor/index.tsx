import { SubmitHandler, useForm } from 'react-hook-form'
import { Color } from '@/types'
import { Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { getColorByName } from '@/app/admin/_data-access'
import { createColor, updateColor } from '@/app/admin/_data-access/color'

export const ColorEditor = ({
  color,
  closeEditor,
}: {
  color: Color | null
  closeEditor: () => void
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Color>({
    defaultValues: { name: color?.name },
  })
  const watchName = watch('name')

  useEffect(() => {
    const checkName = async (name: string, id?: number) => {
      try {
        const existingColor = await getColorByName(name)
        if (existingColor && existingColor.id != id) {
          console.log(existingColor.name)
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
  const onSubmit: SubmitHandler<Color> = async (data) => {
    console.log('Color data:', data)
    if (errors.name) {
      console.log(errors.name)
      return
    }
    if (!color) {
      const createdColor = await createColor(data.name)
      console.log('Color created:', createdColor)
    }
    if (color) {
      const updatedColor = await updateColor(data.id, data.name)
      console.log('Color updated:', updatedColor)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <Field className="flex w-full items-center gap-x-2">
        <Label>Name:</Label>
        <Input type="text" {...register('name', { required: 'Name is required' })} />
      </Field>
      <div className="ms-auto flex gap-x-2">
        {' '}
        <Button
          onClick={closeEditor}
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
