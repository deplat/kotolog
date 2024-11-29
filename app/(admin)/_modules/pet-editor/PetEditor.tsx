'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider, ErrorOption } from 'react-hook-form'
import { createPet, getPetBaseBySlug, updatePet } from '@/data-access'
import { getDefaultValuesFromPetData } from './utils/getDefaultValuesFromPetData'
import { useRouter } from 'next/navigation'
import { uploadImageFileAndReturnImageData } from '@/utils/s3'
import { Button, Fieldset, Legend } from '@headlessui/react'
import {
  ColorFieldset,
  PhotosField,
  TextAreaField,
  TextField,
  DateField,
  ListBox,
  CheckboxField,
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
import { FurType, PetGender, PetType } from '@prisma/client'

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

  const isFemale = gender === 'FEMALE' || pet?.gender === 'FEMALE'
  const wordEnd = isFemale ? 'а' : ''

  useEffect(() => {
    const checkSlug = async (slug: string, id?: string) => {
      try {
        const { data } = await getPetBaseBySlug(slug)
        if (data && data.id !== id) {
          methods.setError('slug', { type: 'custom', message: 'Ссылка уже используется' })
        } else {
          methods.clearErrors('slug')
        }
      } catch {
        methods.setError('slug', {
          type: 'custom',
          message: 'Не удалось проверить слаг, попробуйте позднее',
        })
      }
    }
    if (watchSlug) checkSlug(watchSlug, pet?.id)
    setGender(watchGender)
  }, [watchSlug, watchGender, pet?.id, methods])

  const onSubmit: SubmitHandler<PetCreateInputData | PetUpdateInputData> = async (data) => {
    if (methods.formState.errors.slug) return

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
      await updatePet({ ...data, id: pet.id }).then(({ success, message }) =>
        success ? redirectToPets() : methods.setError('root', { message: message })
      )
    } else if (data.name) {
      await createPet(data as PetCreateInputData).then(({ success, message }) =>
        success ? redirectToPets() : methods.setError('root', { message: message })
      )
    }
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
        {methods.formState.errors.root && (
          <div className={'p-3'}>{`${methods.formState.errors.root}`}</div>
        )}
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
          <DateField label="Дата рождения:" fieldKey="birthDate" />
          <ListBox
            fieldLabel="Тип:"
            fieldKey="petType"
            options={Object.values(PetType).map((type) => ({ value: type, label: type }))}
          />
          <ListBox
            fieldLabel="Пол:"
            fieldKey="gender"
            options={Object.values(PetGender).map((gender) => ({ value: gender, label: gender }))}
          />
          <ListBox
            fieldLabel="Шерсть:"
            fieldKey="furType"
            options={Object.values(FurType).map((fur) => ({ value: fur, label: fur }))}
          />
        </Fieldset>

        <Fieldset className="fieldset gap-y-3">
          <Legend className="mb-3 text-2xl">Установки:</Legend>
          {['isPublished', 'isReadyForAdoption', 'isFeatured', 'isAdopted'].map((fieldKey) => (
            <CheckboxField key={fieldKey} fieldKey={fieldKey} label={fieldKey} />
          ))}
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
          ].map((fieldKey) => (
            <CheckboxField key={fieldKey} fieldKey={fieldKey} label={`${fieldKey}${wordEnd}`} />
          ))}
        </Fieldset>

        <ColorFieldset fieldKey="colors" label="Окрасы" colors={colors} />

        <Fieldset className="fieldset">
          <TextAreaField
            label="Биография"
            placeholder="Информация о питомце в свободном стиле"
            register={methods.register('petProfile.biography')}
          />
        </Fieldset>

        <PhotosField
          name="photos"
          currentImages={pet?.photos || []}
          setImageFilesWithDimensions={setImageFilesWithDimensions}
        />
      </form>
    </FormProvider>
  )
}
