'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePetData, createPetSchema } from '@/schema/pet'
import { useEffect } from 'react'
import { checkIfPetNickNameIsTaken } from '@/utils/checkIfPetNickNameIsTaken'
import { useDebounce } from '@/hooks/useDebounce'
import { Button, Fieldset } from '@headlessui/react'
import Link from 'next/link'
import { ControlledListBoxField, DateField, TextField } from '@/components/form'
import { furTypeOptions, genderOptions, speciesOptions } from '@/modules/pet-form/fieldsOptions'

export const CreatePetForm = ({
  colorOptions,
  profile,
}: {
  colorOptions: Array<{ value: string; label: string }>
  profile: { id: string; name: string; nickName: string }
}) => {
  const { control, watch, handleSubmit, formState, register, setError, clearErrors } =
    useForm<CreatePetData>({
      resolver: zodResolver(createPetSchema),
    })

  const debouncedNickName = useDebounce(watch('nickName'), 500)

  useEffect(() => {
    async function checkNickName(nickName: string) {
      if (!nickName) return
      try {
        const isTaken = await checkIfPetNickNameIsTaken(nickName)
        if (isTaken) {
          setError('nickName', {
            type: 'custom',
            message: `Никнейм "${nickName}" занят, введите другой никнейм.`,
          })
        } else {
          clearErrors('nickName')
        }
      } catch (error) {
        setError('nickName', {
          type: 'custom',
          message: 'Не удалось проверить никнейм, попробуйте позднее.',
        })
      }
    }
    checkNickName(debouncedNickName)
  }, [debouncedNickName, setError, clearErrors])

  const onSubmit = async (data: CreatePetData) => {
    console.log(formState.errors.birthDate)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed top-2 z-90 flex justify-center rounded bg-stone-100 shadow-lg ring-1 ring-stone-700/60 dark:bg-gray-700 dark:ring-stone-400/50 sm:top-6">
        <Button type="submit" className="btn-primary">
          Сохранить
        </Button>
        <Link href={`/profiles/${profile.nickName}/pets`} className="btn-warning dark:ring-0">
          Закрыть
        </Link>
      </div>
      <Fieldset className="fieldset">
        <TextField
          label="Имя"
          name="name"
          placeholder="Введите имя питомца"
          register={register}
          errors={formState.errors}
        />
        <TextField
          label="Ник"
          name="nickName"
          placeholder="Введите ник питомца"
          register={register}
          errors={formState.errors}
        />
        <DateField
          control={control}
          label="Дата рождения:"
          fieldKey="birthDate"
          errors={formState.errors.birthDate}
        />
        <ControlledListBoxField
          control={control}
          label="Вид:"
          fieldKey="type"
          options={speciesOptions}
        />
        <ControlledListBoxField
          control={control}
          label="Пол:"
          fieldKey="gender"
          options={genderOptions}
        />
        <ControlledListBoxField
          control={control}
          label="Шерсть:"
          fieldKey="furType"
          options={furTypeOptions}
        />
        <ControlledListBoxField
          control={control}
          fieldKey="colors"
          multiple
          options={colorOptions}
          label="Окрасы"
        />
      </Fieldset>
    </form>
  )
}
