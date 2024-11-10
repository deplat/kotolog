'use client'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Colors, createPet, getPetBySlug, Pet, updatePet } from '@/data-access'
import { ImageFileWithDimensions, ImageWithDimensions, PetData } from '@/types'
import { getDefaultValuesFromPetData } from './utils/getDefaultValuesFromPetData'
import { useRouter } from 'next/navigation'
import { uploadFileAndReturnURL } from '@/utils/uploadFileAndReturnURL'
import { Button, Fieldset, Legend } from '@headlessui/react'
import {
  AvatarField,
  ColorField,
  ControlledCheckbox,
  ControlledDateField,
  ControlledListBox,
  PhotosField,
  TextAreaField,
  TextField,
} from '@/app/(admin)/_modules/pet-editor/components'
import clsx from 'clsx'
import { Gender } from 'aws-sdk/clients/polly'

export const PetEditor = ({ pet, colors }: { pet: Pet | null; colors: Colors }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<PetData>({
    defaultValues: getDefaultValuesFromPetData(pet),
  })

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<ImageWithDimensions | null>(null)
  const [gender, setGender] = useState<Gender | null>(null)
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    ImageFileWithDimensions[]
  >([])

  const router = useRouter()

  const redirectToPets = () => router.push(`/admin/pets`)

  const watchSlug = watch('slug')
  const watchGender = watch('gender')

  const isFemale = pet?.gender === 'FEMALE'
  const wordEnd = () => (isFemale || gender == 'FEMALE' ? 'a' : '')

  useEffect(() => {
    const checkSlug = async (slug: string, id?: number) => {
      try {
        const existingPet = await getPetBySlug(slug)
        if (existingPet && existingPet.id != id) {
          console.log(existingPet.slug)
          setError('slug', { type: 'custom', message: 'Ссылка уже используется' })
        } else {
          clearErrors('slug')
        }
      } catch (error) {
        setError('slug', {
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
  }, [clearErrors, setError, watchSlug, watchGender, setGender])

  const onSubmit: SubmitHandler<PetData> = async (data) => {
    console.log(isSubmitting)

    if (errors.slug) {
      console.log(errors.slug)
      return
    }
    if (errors.name) console.log(errors.name)
    if (errors.colors) console.log(errors.colors)
    if (errors.avatar) console.log(errors.avatar)
    if (errors.photos) console.log(errors.photos)

    const uploadedPhotos: ImageWithDimensions[] = []

    if (avatar && avatarFile) {
      try {
        const avatarUrl = await uploadFileAndReturnURL(avatarFile)
        if (avatarUrl) {
          data.avatar = {
            src: avatarUrl,
            width: avatar.width,
            height: avatar.height,
          }
        }
      } catch (error) {
        console.error('Avatar upload error:', (error as Error).message)
      }
    }

    for (const item of imageFilesWithDimensions) {
      try {
        const photoUrl = await uploadFileAndReturnURL(item.file)
        if (photoUrl) {
          uploadedPhotos.push({
            src: photoUrl,
            width: 300,
            height: 300,
          })
        }
      } catch (error) {
        console.error('Photo upload error:', (error as Error).message)
      }
    }
    data.photos = uploadedPhotos

    console.log(data)
    if (!pet?.id) {
      const createdPet = await createPet(data)
      console.log(createdPet)
    }

    if (pet) {
      const updatedPet = await updatePet(pet.id, data)
      console.log(updatedPet)
    }
    redirectToPets()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col items-center justify-center pb-28 pt-3"
    >
      <Fieldset className="mb-6 flex w-full flex-col border border-stone-950 p-3">
        <div className="mb-3">
          <AvatarField control={control} setAvatar={setAvatar} setAvatarFile={setAvatarFile} />
        </div>
        <TextField
          label="Имя"
          register={register('name', { required: 'Имя обязательно' })}
          errors={errors.name}
        />
        <TextField
          label="Слаг"
          register={register('slug', { required: 'Слаг обязателен' })}
          errors={errors.slug}
        />
        <ControlledDateField label="Дата рождения:" fieldKey="birthDate" control={control} />
        <ControlledListBox
          fieldLabel="Тип:"
          fieldKey="petType"
          options={[
            { value: 'CAT', label: 'CAT' },
            { value: 'DOG', label: 'DOG' },
          ]}
          control={control}
        />
        <ControlledListBox
          fieldLabel="Пол:"
          fieldKey="gender"
          options={[
            { value: 'MALE', label: 'МУЖ' },
            { value: 'FEMALE', label: 'ЖЕН' },
            { value: undefined, label: 'НЕТ' },
          ]}
          control={control}
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
          control={control}
        />
      </Fieldset>

      <Fieldset className="mb-6 flex w-full flex-col gap-y-2 border border-stone-950 bg-stone-50/85 p-3 sm:p-6">
        <Legend className="mb-3 text-2xl">Установки:</Legend>
        {[
          { fieldKey: 'isVisible', label: 'отображать на сайте' },
          { fieldKey: 'isAvailable', label: 'доступен к пристрою' },
          { fieldKey: 'isFeatured', label: 'активный пристрой' },
          { fieldKey: 'isAdopted', label: 'принят в семью' },
          { fieldKey: 'isUnclaimed', label: 'не востребован' },
        ].map((field, index) => (
          <ControlledCheckbox
            key={index}
            control={control}
            errors={errors}
            fieldKey={field.fieldKey}
            label={field.label}
          />
        ))}
      </Fieldset>

      <Fieldset className="mb-6 flex w-full flex-col gap-y-2 rounded bg-stone-50/85 p-3 ring-2 ring-stone-700/75 dark:ring-stone-400/75 sm:p-6">
        <Legend className="mb-3 text-2xl">Здоровье и поведение:</Legend>
        {[
          { fieldKey: 'vaccinated', label: `вакцинирован${wordEnd()}` },
          { fieldKey: 'sterilized', label: `стерилизован${wordEnd()}` },
          { fieldKey: 'treatedForParasites', label: `обработан${wordEnd()} от паразитов` },
          { fieldKey: 'litterBoxTrained', label: `приучен${wordEnd()} к лотку` },
          { fieldKey: 'usesScratchingPost', label: 'пользуется когтеточкой' },
          { fieldKey: 'socialized', label: `социализирован${wordEnd()}` },
          { fieldKey: 'friendlyWithCats', label: 'ладит с кошками' },
          { fieldKey: 'friendlyWithDogs', label: 'ладит с собаками' },
          { fieldKey: 'friendlyWithAnimals', label: 'ладит с другими животными' },
        ].map((field, index) => (
          <ControlledCheckbox
            key={index}
            control={control}
            errors={errors}
            fieldKey={field.fieldKey}
            label={field.label}
          />
        ))}
      </Fieldset>
      <Fieldset className="flex w-full flex-col items-center justify-center">
        <TextAreaField label={'Биография'} register={register('biography')} />
        <ColorField control={control} colors={colors} />
        <PhotosField control={control} setImageFilesWithDimensions={setImageFilesWithDimensions} />
      </Fieldset>
      <div className="fixed bottom-20 flex justify-center gap-x-2 border border-stone-950 bg-stone-100">
        <Button
          type="submit"
          className={clsx(
            'px-4 py-2.5 underline-offset-4',
            'data-[hover]:text-green-600 data-[hover]:underline'
          )}
        >
          Save
        </Button>
        <Button
          onClick={redirectToPets}
          className={clsx(
            'px-4 py-2.5 underline-offset-4',
            'data-[hover]:text-red-500 data-[hover]:underline'
          )}
        >
          Close
        </Button>
      </div>
    </form>
  )
}
