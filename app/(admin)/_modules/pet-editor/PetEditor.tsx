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
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    ImageFileWithDimensions[]
  >([])

  const router = useRouter()

  const redirectToPets = () => router.push(`/admin/pets`)

  const watchSlug = watch('slug')

  useEffect(() => {
    const checkSlug = async (slug: string, id?: number) => {
      try {
        const existingPet = await getPetBySlug(slug)
        if (existingPet && existingPet.id != id) {
          console.log(existingPet.slug)
          setError('slug', { type: 'custom', message: 'Slug is already in use' })
        } else {
          clearErrors('slug')
        }
      } catch (error) {
        setError('slug', { type: 'custom', message: 'Cannot check slug' })
      }
    }
    if (watchSlug) {
      checkSlug(watchSlug, pet?.id).then()
    }
  }, [clearErrors, setError, watchSlug])

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
          label="Name"
          register={register('name', { required: 'Name is required' })}
          errors={errors.name}
        />
        <TextField
          label="Slug"
          register={register('slug', { required: 'Slug is required' })}
          errors={errors.slug}
        />
        <ControlledDateField label="Birth Date:" fieldKey="birthDate" control={control} />
        <ControlledListBox
          fieldLabel="Pet type:"
          fieldKey="petType"
          options={[
            { value: 'CAT', label: 'CAT' },
            { value: 'DOG', label: 'DOG' },
          ]}
          control={control}
        />
        <ControlledListBox
          fieldLabel="Gender"
          fieldKey="gender"
          options={[
            { value: 'MALE', label: 'MALE' },
            { value: 'FEMALE', label: 'FEMALE' },
            { value: undefined, label: 'NO' },
          ]}
          control={control}
        />
        <ControlledListBox
          fieldLabel="Fur type"
          fieldKey="furType"
          options={[
            { value: null, label: 'NO' },
            { value: 'SHORT', label: 'SHORT' },
            { value: 'MEDIUM', label: 'MEDIUM' },
            { value: 'LONG', label: 'LONG' },
            { value: 'HAIRLESS', label: 'HAIRLESS' },
          ]}
          control={control}
        />
      </Fieldset>

      <Fieldset className="mb-6 flex w-full flex-col gap-y-2 border border-stone-950 p-3 sm:p-6">
        <Legend className="mb-3 text-2xl">Controls:</Legend>
        {[
          { fieldKey: 'isFeatured', label: 'featured' },
          { fieldKey: 'isUnclaimed', label: 'unclaimed' },
          { fieldKey: 'isAdopted', label: 'adopted' },
          { fieldKey: 'isAvailable', label: 'available' },
          { fieldKey: 'isVisible', label: 'visible' },
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

      <Fieldset className="mb-6 flex w-full flex-col gap-y-2 border border-stone-950 p-3 sm:p-6">
        <Legend className="mb-3 text-2xl">Health & Behavior:</Legend>
        {[
          { fieldKey: 'vaccinated', label: 'vaccinated' },
          { fieldKey: 'sterilized', label: 'sterilized' },
          { fieldKey: 'treatedForParasites', label: 'treated for parasites' },
          { fieldKey: 'litterBoxTrained', label: 'litter box trained' },
          { fieldKey: 'usesScratchingPost', label: 'uses scratching post' },
          { fieldKey: 'socialized', label: 'socialized' },
          { fieldKey: 'friendlyWithCats', label: 'friendly with cats' },
          { fieldKey: 'friendlyWithDogs', label: 'friendly with dogs' },
          { fieldKey: 'friendlyWithAnimals', label: 'friendly with other animals' },
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
        <TextAreaField label={'Biography'} register={register('biography')} />
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
