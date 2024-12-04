'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Path } from 'react-hook-form'
import { Button, Fieldset, Legend } from '@headlessui/react'
import {
  ControlledImagesField,
  TextAreaField,
  TextField,
  DateField,
  ControlledCheckboxField,
  ControlledListBoxField,
} from '@/modules/pet-editor/components'
import { uploadImageFileAndReturnImageData } from '@/utils/s3'
import Link from 'next/link'
import {
  PetColorData,
  PetCreateInputData,
  PetData,
  PetImageCreateInputData,
  PetImageFileWithDimensions,
  PetUpdateInputData,
} from '@/types/pet'
import { getDefaultValuesFromPetData } from './utils/getDefaultValuesFromPetData'
import { createPet, updatePet, getPetBaseByNickName } from '@/data-access'
import {
  controlsFields,
  furTypeOptions,
  genderOptions,
  healthAndBehaviorFields,
  speciesOptions,
} from '@/modules/pet-editor/petEditorFields'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export const PetEditor = ({
  pet,
  colors,
  profile,
}: {
  pet: PetData | null
  colors: PetColorData[]
  profile: { nickName: string }
}) => {
  const [deletedPhotosIds, setDeletedPhotosIds] = useState<string[]>([])
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    PetImageFileWithDimensions[]
  >([])
  const [feedback, setFeedback] = useState<string | null>(null)

  const router = useRouter()

  type FormData<T> = T extends { pet: any } ? PetUpdateInputData : PetCreateInputData

  const methods = useForm<FormData<typeof pet>>({
    defaultValues: getDefaultValuesFromPetData(pet, profile),
  })
  const { control, watch, handleSubmit, formState, register, setError, clearErrors } = methods

  const watchNickName = watch('nickName')

  useEffect(() => {
    const checkSlug = async (nickName: string, id?: string) => {
      try {
        const { data } = await getPetBaseByNickName(nickName)
        if (data && data.id !== id) {
          setError('nickName', { type: 'custom', message: 'Такой ник-нэйм уже используется' })
        } else {
          clearErrors('nickName')
        }
      } catch {
        setError('nickName', {
          type: 'custom',
          message: 'Не удалось проверить ник-нэйм, попробуйте позднее',
        })
      }
    }
    if (watchNickName) checkSlug(watchNickName, pet?.id)
  }, [watchNickName, pet?.id, setError, clearErrors])

  const onSubmit: SubmitHandler<PetCreateInputData | PetUpdateInputData> = async (data) => {
    console.log(imageFilesWithDimensions)
    console.log(data)
    if (formState.errors.nickName) return

    const uploadedPetImages: PetImageCreateInputData[] = []

    for (const item of imageFilesWithDimensions) {
      try {
        const { s3Key, src } = await uploadImageFileAndReturnImageData(item.file)
        if (s3Key && src) {
          uploadedPetImages.push({
            s3Key,
            src,
            width: item.width,
            height: item.height,
            isPrimary: item.isPrimary,
            isAvatar: item.isAvatar,
          })
        }
      } catch (error) {
        console.error('Photo upload error:', (error as Error).message)
      }
    }

    data.photos = [...data.photos, ...uploadedPetImages]
    data.profile = profile

    if (pet) {
      ;(data as PetUpdateInputData).deletedPhotosIds = deletedPhotosIds
      await updatePet({ ...(data as PetUpdateInputData), id: pet.id }).then(
        ({ success, message }) => {
          if (success) {
            setFeedback('Питомец обновлен успешно')
            setTimeout(() => setFeedback(null), 2000)
            router.push('/profiles/' + profile.nickName + '/pets/' + data.nickName)
          } else {
            setFeedback('Не удалось обновить питомца')
            setTimeout(() => setFeedback(null), 2000)
          }
        }
      )
    } else {
      await createPet(data as PetCreateInputData).then(({ success, message }) => {
        if (success) {
          setFeedback('Питомец добавлен успешно')
          setTimeout(() => setFeedback(null), 2000)
          router.push('/profiles/' + profile.nickName + '/pets')
        } else {
          setFeedback('Не удалось добавить питомца')
          setTimeout(() => setFeedback(null), 2000)
        }
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 flex w-full max-w-2xl flex-col items-center justify-center sm:mt-20"
    >
      <div
        className={clsx('bottom-10 rounded bg-black p-4 text-white', feedback ? 'fixed' : 'hidden')}
      >
        {feedback}
      </div>
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
          register={methods.register('name', { required: 'Имя обязательно' })}
          errors={methods.formState.errors.name}
        />
        <TextField
          label="Ник"
          register={methods.register('nickName', { required: 'Ник обязателен' })}
          errors={methods.formState.errors.nickName}
        />
        <DateField control={control} label="Дата рождения:" fieldKey="birthDate" />
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
      </Fieldset>

      <Fieldset className="fieldset">
        <Legend className="mb-3 text-2xl">Установки:</Legend>
        <div className="flex w-full flex-col">
          {controlsFields.map((field) => (
            <ControlledCheckboxField
              key={field.key}
              control={control}
              fieldKey={field.key as Path<FormData<typeof pet>>}
              label={field.label}
            />
          ))}
        </div>
      </Fieldset>

      <Fieldset className="fieldset">
        <Legend className="mb-3 text-2xl">Здоровье и поведение:</Legend>
        <div className="flex w-full flex-col">
          {healthAndBehaviorFields.map((field) => (
            <ControlledCheckboxField
              key={field.key}
              control={control}
              fieldKey={field.key as Path<FormData<typeof pet>>}
              label={field.label}
            />
          ))}
        </div>
      </Fieldset>

      <Fieldset className="fieldset">
        <TextAreaField
          label="Биография"
          placeholder="Информация о питомце в свободном стиле"
          register={register('petProfile.biography')}
        />
      </Fieldset>

      <ControlledImagesField
        control={control}
        fieldKey="photos"
        setDeletedPhotosIds={setDeletedPhotosIds}
        setImageFilesWithDimensions={setImageFilesWithDimensions}
      />
    </form>
  )
}
