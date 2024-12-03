'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, Path } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button, Fieldset, Legend } from '@headlessui/react'
import {
  ColorFieldset,
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
import { FurType, PetGender, PetType } from '@prisma/client'
import { getDefaultValuesFromPetData } from './utils/getDefaultValuesFromPetData'
import { createPet, updatePet } from '@/data-access'
import { getPetBaseByNickName } from '@/data-access/pet'

interface CheckboxFieldOption<T> {
  key: Path<T>
  label: string
}

const controlsFields: CheckboxFieldOption<any>[] = [
  { key: 'isPublished', label: 'Опубликован' },
  { key: 'isReadyForAdoption', label: 'Готов к пристрою' },
  { key: 'isFeatured', label: 'Активный пристрой' },
  { key: 'isAdopted', label: 'Принят в семью' },
]

const healthAndBehaviorFields: CheckboxFieldOption<any>[] = [
  { key: 'petProfile.isVaccinated', label: 'Vaccinated' },
  { key: 'petProfile.isSterilized', label: 'Sterilized' },
  { key: 'petProfile.isTreatedForParasites', label: 'Treated for Parasites' },
  { key: 'petProfile.isLitterBoxTrained', label: 'Litter Box Trained' },
  { key: 'petProfile.isUsesScratchingPost', label: 'Uses Scratching Post' },
  { key: 'petProfile.isSocialized', label: 'Socialized' },
  { key: 'petProfile.isFriendlyWithCats', label: 'Friendly with Cats' },
  { key: 'petProfile.isFriendlyWithDogs', label: 'Friendly with Dogs' },
  { key: 'petProfile.isFriendlyWithOtherAnimals', label: 'Friendly with Other Animals' },
]

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
  console.log(pet)
  type FormData<T> = T extends { pet: any } ? PetUpdateInputData : PetCreateInputData
  const methods = useForm<FormData<typeof pet>>({
    defaultValues: getDefaultValuesFromPetData(pet, profile),
  })

  const { control, watch, handleSubmit, formState, register, setError, clearErrors } = methods
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    PetImageFileWithDimensions[]
  >([])
  const router = useRouter()

  const redirectToPets = () => router.push(`/profiles/${profile.nickName}/pets`)

  const watchNickName = watch('nickName')

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
  }, [watchNickName, pet?.id, setError, clearErrors])

  const onSubmit: SubmitHandler<PetCreateInputData | PetUpdateInputData> = async (data) => {
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

    data.photos = uploadedPetImages
    data.profile = profile

    if (pet) {
      await updatePet({ ...data, id: pet.id }).then(({ success, message }) =>
        success ? redirectToPets() : setError('root', { message })
      )
    } else if (data.name) {
      await createPet(data as PetCreateInputData).then(({ success, message }) =>
        success ? redirectToPets() : setError('root', { message })
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

          <Fieldset className="mb-4 flex w-full flex-col rounded bg-stone-100 p-3 shadow dark:bg-gray-700/50 sm:shadow-lg md:p-6">
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
            <ControlledListBoxField
              control={control}
              label="Тип:"
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

          <Fieldset className="mb-4 flex w-full flex-col rounded bg-stone-100 p-3 shadow dark:bg-gray-700/50 sm:shadow-lg md:p-6">
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

          <Fieldset className="mb-4 flex w-full flex-col rounded bg-stone-100 p-3 shadow dark:bg-gray-700/50 sm:shadow-lg md:p-6">
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

          <ColorFieldset control={control} fieldKey="colors" label="Окрасы" colors={colors} />

          <Fieldset className="fieldset">
            <TextAreaField
              label="Биография"
              placeholder="Информация о питомце в свободном стиле"
              register={register('petProfile.biography')}
            />
          </Fieldset>

          <ControlledImagesField
            name="photos"
            currentImages={pet?.photos || []}
            setImageFilesWithDimensions={setImageFilesWithDimensions}
          />
        </form>
      </FormProvider>
    </div>
  )
}
