'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { createPet, getPetBaseBySlug, updatePet } from '@/data-access'
import { getDefaultValuesFromPetData } from './utils/getDefaultValuesFromPetData'
import { useRouter } from 'next/navigation'
import { uploadImageFileAndReturnImageData } from '@/utils/s3'
import { Button, Fieldset, Legend } from '@headlessui/react'
import {
  ColorFieldset,
  ControlledCheckbox,
  ControlledDateField,
  ControlledListBox,
  PhotosField,
  TextAreaField,
  TextField,
} from '@/app/(admin)/_modules/pet-editor/components'
import { Gender } from 'aws-sdk/clients/polly'
import Link from 'next/link'
import {
  PetColorData,
  PetCreateInputData,
  PetData,
  PetImageCreateInputData,
  PetImageFileWithDimensions,
  PetUpdateInputData,
} from '@/types/pet'

export const PetEditor = ({
  pet,
  colors,
  profile,
}: {
  pet: PetData | null
  colors: PetColorData[]
  profile: { id: string; name: string }
}) => {
  const methods = useForm<PetCreateInputData>({
    defaultValues: getDefaultValuesFromPetData(pet, profile),
  })

  const [gender, setGender] = useState<Gender | null>(null)
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    PetImageFileWithDimensions[]
  >([])
  const router = useRouter()

  const redirectToPets = () => router.push(`/admin/pets`)

  const watchSlug = methods.watch('slug')
  const watchGender = methods.watch('gender')

  const isFemale = pet?.gender === 'FEMALE'
  const wordEnd = () => (isFemale || gender == 'FEMALE' ? 'a' : '')

  useEffect(() => {
    const checkSlug = async (slug: string, id?: string) => {
      try {
        const { success, message, data } = await getPetBaseBySlug(slug)
        if (data && data.id != id) {
          methods.setError('slug', { type: 'custom', message: 'Ссылка уже используется' })
        } else {
          methods.clearErrors('slug')
        }
      } catch (error) {
        methods.setError('slug', {
          type: 'custom',
          message: 'Не удалось проверить слаг, попробуйте позднее',
        })
      }
    }
    if (watchSlug) {
      checkSlug(watchSlug, pet?.id).then()
    }
    if (watchGender) {
      setGender(watchGender)
    }
  }, [methods.clearErrors, methods.setError, watchSlug, watchGender, setGender])

  const onSubmit: SubmitHandler<PetCreateInputData | PetUpdateInputData> = async (data) => {
    const { errors } = methods.formState
    if (errors.slug) {
      console.log(errors.slug)
      return
    }
    if (errors.name) console.log(errors.name)
    if (errors.colors) console.log(errors.colors)
    if (errors.photos) console.log(errors.photos)

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
    console.log(data)
    if (pet) {
      const updateData: PetUpdateInputData = data
      updateData.id = pet.id
      const updatedPet = await updatePet(updateData)
      console.log(updatedPet)
    } else if (data.name) {
      const createdPet = await createPet(data as PetCreateInputData)
      console.log(createdPet)
    }
    redirectToPets()
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mt-12 flex w-full max-w-2xl flex-col items-center justify-center sm:mt-20"
      >
        <div className="fixed top-2 z-90 flex justify-center rounded bg-stone-100 shadow-lg ring-1 ring-stone-700/60 dark:bg-gray-700 dark:ring-stone-400/50 sm:top-6">
          <Button type="submit" className="btn-primary">
            Сохранить
          </Button>
          <Link href="/admin/pets" className="btn-warning dark:ring-0">
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
            label="Slug"
            register={methods.register('slug', { required: 'Слаг обязателен' })}
            errors={methods.formState.errors.slug}
          />
          <ControlledDateField label="Дата рождения:" fieldKey="birthDate" />
          <ControlledListBox
            fieldLabel="Тип:"
            fieldKey="petType"
            options={[
              { value: 'CAT', label: 'КОШКА' },
              { value: 'DOG', label: 'СОБАКА' },
            ]}
          />
          <ControlledListBox
            fieldLabel="Пол:"
            fieldKey="gender"
            options={[
              { value: 'MALE', label: 'МУЖ' },
              { value: 'FEMALE', label: 'ЖЕН' },
              { value: null, label: 'НЕТ' },
            ]}
          />
          <ControlledListBox
            fieldLabel="Шерсть:"
            fieldKey="furType"
            options={[
              { value: null, label: 'НЕ УКАЗАНО' },
              { value: 'SHORT', label: 'КОРОТКАЯ' },
              { value: 'MEDIUM', label: 'СРЕДНЯЯ' },
              { value: 'LONG', label: 'ДЛИННАЯ' },
              { value: 'HAIRLESS', label: 'ОТСУТСТВУЕТ' },
            ]}
          />
        </Fieldset>

        <Fieldset className="fieldset gap-y-3">
          <Legend className="mb-3 text-2xl">Установки:</Legend>
          {[
            { fieldKey: 'isPublished', label: 'отображать на сайте' },
            { fieldKey: 'isReadyForAdoption', label: 'доступен к пристрою' },
            { fieldKey: 'isFeatured', label: 'активный пристрой' },
            { fieldKey: 'isAdopted', label: 'принят в семью' },
          ].map((field, index) => (
            <ControlledCheckbox key={index} fieldKey={field.fieldKey} label={field.label} />
          ))}
        </Fieldset>

        <Fieldset className="fieldset gap-y-3">
          <Legend className="mb-3 text-2xl">Здоровье и поведение:</Legend>
          {[
            { fieldKey: 'isVaccinated', label: `вакцинирован${wordEnd()}` },
            { fieldKey: 'isSterilized', label: `стерилизован${wordEnd()}` },
            { fieldKey: 'isTreatedForParasites', label: `обработан${wordEnd()} от паразитов` },
            { fieldKey: 'isLitterBoxTrained', label: `приучен${wordEnd()} к лотку` },
            { fieldKey: 'isUsesScratchingPost', label: 'пользуется когтеточкой' },
            { fieldKey: 'isSocialized', label: `социализирован${wordEnd()}` },
            { fieldKey: 'isFriendlyWithCats', label: 'ладит с кошками' },
            { fieldKey: 'isFriendlyWithDogs', label: 'ладит с собаками' },
            { fieldKey: 'isFriendlyWithOtherAnimals', label: 'ладит с другими животными' },
          ].map((field, index) => (
            <ControlledCheckbox key={index} fieldKey={field.fieldKey} label={field.label} />
          ))}
        </Fieldset>
        <ColorFieldset fieldKey={'colors'} label={'Окрасы'} colors={colors} />
        <Fieldset className="fieldset">
          <TextAreaField
            label={'Биография'}
            placeholder={'Информация о питомце в свободном стиле'}
            register={methods.register('petProfile.biography')}
          />
        </Fieldset>
        <PhotosField
          name={'photos'}
          currentImages={pet?.photos?.map((photo) => photo) || []}
          setImageFilesWithDimensions={setImageFilesWithDimensions}
        />
      </form>
    </FormProvider>
  )
}
