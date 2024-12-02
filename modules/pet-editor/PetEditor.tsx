'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, useController } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Fieldset, Legend } from '@headlessui/react'
import {
  ColorFieldset,
  PhotosField,
  TextAreaField,
  TextField,
  DateField,
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
import { FurType, PetGender, PetType } from '@prisma/client'
import { getDefaultValuesFromPetData } from './utils/getDefaultValuesFromPetData'
import { createPet, updatePet } from '@/data-access'
import { IoCheckmark } from 'react-icons/io5'
import { getPetBaseByNickName } from '@/data-access/pet'
import { ControlledListBox } from '@/modules/pet-editor/components/ListBox'

const speciesOptions = [
  { value: PetType.CAT, label: 'Кошка' },
  { value: PetType.DOG, label: 'Собака' },
]

const genderOptions = [
  { value: PetGender.MALE, label: 'Мальчик' },
  { value: PetGender.FEMALE, label: 'Девочка' },
]

const furTypeOptions = [
  { value: FurType.SHORT, label: 'Короткий' },
  { value: FurType.LONG, label: 'Длинный' },
  { value: FurType.MEDIUM, label: 'Средний' },
  { value: FurType.HAIRLESS, label: 'Без шерсти' },
  { value: FurType.NONE, label: 'Не указано' },
]

export const PetEditor = ({
  pet,
  colors,
  profile,
}: {
  pet: PetData | null
  colors: PetColorData[]
  profile: { nickName: string }
}) => {
  const methods = useForm<PetCreateInputData>({
    defaultValues: getDefaultValuesFromPetData(pet, profile),
  })

  const { control, watch, handleSubmit, formState, register, setError, clearErrors } = methods
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    PetImageFileWithDimensions[]
  >([])
  const router = useRouter()

  const redirectToPets = () => router.push(`/profiles/${profile.nickName}/pets`)

  const watchNickName = watch('nickName')
  const watchGender = watch('gender')
  const [gender, setGender] = useState<string | null>(null)

  const isFemale = gender === 'FEMALE' || pet?.gender === 'FEMALE'
  const wordEnd = isFemale ? 'а' : ''

  useEffect(() => {
    const checkSlug = async (nickName: string, id?: string) => {
      try {
        const { data } = await getPetBaseByNickName(nickName)
        if (data && data.id !== id) {
          setError('nickName', { type: 'custom', message: 'Ссылка уже используется' })
        } else {
          clearErrors('nickName')
        }
      } catch {
        setError('nickName', {
          type: 'custom',
          message: 'Не удалось проверить слаг, попробуйте позднее',
        })
      }
    }
    if (watchNickName) checkSlug(watchNickName, pet?.id)
    setGender(watchGender)
  }, [watchNickName, watchGender, pet?.id, setError, clearErrors])

  const renderCheckbox = (fieldKey: keyof PetCreateInputData, label: string) => {
    const { field } = useController({
      name: fieldKey,
      control,
    })

    return (
      <div className="flex w-full items-center space-x-4" key={fieldKey}>
        <button
          type="button"
          onClick={() => field.onChange(!field.value)}
          className={`checkbox group ${field.value ? 'checked' : ''}`}
        >
          {field.value && <IoCheckmark className="checkbox-icon" />}
        </button>
        <label
          htmlFor={fieldKey}
          onClick={() => field.onChange(!field.value)}
          className="cursor-pointer dark:text-stone-300"
        >
          {label}
        </label>
      </div>
    )
  }

  const onSubmit: SubmitHandler<PetCreateInputData | PetUpdateInputData> = async (data) => {
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

    data.photos = uploadedPetImages
    data.profile = profile

    if (pet) {
      await updatePet({ ...data, id: pet.id }).then(({ success, message }) =>
        success ? redirectToPets() : setError('root', { message: message })
      )
    } else if (data.name) {
      await createPet(data as PetCreateInputData).then(({ success, message }) =>
        success ? redirectToPets() : setError('root', { message: message })
      )
    }
  }

  return (
    <div className="h-full">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 flex w-full max-w-2xl flex-col items-center justify-center sm:mt-20"
        >
          <div className="sticky top-2 z-90 flex justify-center rounded bg-stone-100 shadow-lg ring-1 ring-stone-700/60 dark:bg-gray-700 dark:ring-stone-400/50 sm:top-6">
            <Button type="submit" className="btn-primary">
              Сохранить
            </Button>
            <Link href={`/profiles/${profile.nickName}/pets`} className="btn-warning dark:ring-0">
              Закрыть
            </Link>
          </div>
          {formState.errors.root && <div className={'p-3'}>{`${formState.errors.root}`}</div>}

          <Fieldset className="fieldset">
            <TextField
              label="Имя"
              register={methods.register('name', { required: 'Имя обязательно' })}
              errors={methods.formState.errors.name}
            />
            <TextField
              label="Slug"
              register={methods.register('nickName', { required: 'Слаг обязателен' })}
              errors={methods.formState.errors.nickName}
            />
            <DateField label="Дата рождения:" fieldKey="birthDate" />
            <ControlledListBox
              control={control}
              label="Тип:"
              fieldKey="type"
              options={speciesOptions}
            />
            <ControlledListBox
              control={control}
              label="Пол:"
              fieldKey="gender"
              options={genderOptions}
            />
            <ControlledListBox
              control={control}
              label="Шерсть:"
              fieldKey="furType"
              options={furTypeOptions}
            />
          </Fieldset>

          <Fieldset className="fieldset gap-y-3">
            <Legend className="mb-3 text-2xl">Установки:</Legend>
            {['isPublished', 'isReadyForAdoption', 'isFeatured', 'isAdopted'].map((fieldKey) =>
              renderCheckbox(fieldKey as keyof PetCreateInputData, fieldKey)
            )}
          </Fieldset>

          <Fieldset className="fieldset gap-y-3">
            <Legend className="mb-3 text-2xl">Здоровье и поведение:</Legend>
            {[
              'isVaccinated',
              'isSterilized',
              'isTreatedForParasites',
              'isLitterBoxTrained',
              'isUsesScratchingPost',
              'isSocialized',
              'isFriendlyWithCats',
              'isFriendlyWithDogs',
              'isFriendlyWithOtherAnimals',
            ].map((fieldKey) =>
              renderCheckbox(fieldKey as keyof PetCreateInputData, `${fieldKey}${wordEnd}`)
            )}
          </Fieldset>

          <ColorFieldset fieldKey="colors" label="Окрасы" colors={colors} />

          <Fieldset className="fieldset">
            <TextAreaField
              label="Биография"
              placeholder="Информация о питомце в свободном стиле"
              register={register('petProfile.biography')}
            />
          </Fieldset>

          <PhotosField
            name="photos"
            currentImages={pet?.photos || []}
            setImageFilesWithDimensions={setImageFilesWithDimensions}
          />
        </form>
      </FormProvider>
    </div>
  )
}
