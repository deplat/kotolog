'use client'

import { Button, Fieldset, Legend } from '@headlessui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Pet, Colors, createPet, getPetBySlug, updatePet } from '../(data-access)'
import { Color, ImageWithDimensions, ImageFileWithDimensions, PetData } from '@/types'
import { uploadFileAndGetURL } from '@/lib/file-uploading'
import { useRouter } from 'next/navigation'
import {
  ColorsSelector,
  ControlledCheckbox,
  ControlledDateField,
  AvatarSelector,
  PhotosSelector,
  TextField,
  TextareaField,
  ControlledRadioGroup,
} from '../(components)'
import { getDefaultValues } from '../(lib)'

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
    defaultValues: getDefaultValues(pet),
  })

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<ImageWithDimensions | null>(null)
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    ImageFileWithDimensions[]
  >([])

  const router = useRouter()

  const redirectToEditorMain = () => router.push(`/admin/editor`)

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
      checkSlug(watchSlug, pet?.id)
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
        const avatarUrl = await uploadFileAndGetURL(avatarFile)
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
        const photoUrl = await uploadFileAndGetURL(item.file)
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
    router.push('/admin/editor')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-4"
    >
      <Fieldset className="mb-20 flex w-full flex-col items-center justify-center gap-y-2">
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
        <ControlledDateField label="Birth Date" fieldKey="birthdate" control={control} />
      </Fieldset>
      <ControlledRadioGroup
        legend="Pet type"
        fieldKey="petType"
        options={[
          { value: 'CAT', label: 'CAT' },
          { value: 'DOG', label: 'DOG' },
        ]}
        control={control}
      />
      <ControlledRadioGroup
        legend="Gender"
        fieldKey="gender"
        options={[
          { value: 'MALE', label: 'MALE' },
          { value: 'FEMALE', label: 'FEMALE' },
          { value: undefined, label: 'NO' },
        ]}
        control={control}
      />
      <ControlledRadioGroup
        legend="Fur type"
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
      <Fieldset className="flex w-full max-w-lg flex-col items-center justify-center space-y-2">
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

      <Fieldset className="flex w-full max-w-lg flex-col items-center justify-center space-y-2">
        <Legend className="mb-4 me-auto text-xl">health & behavior:</Legend>
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
        <TextareaField register={register('biography')} />
        <ColorsSelector control={control} colors={colors} />
        <AvatarSelector control={control} setAvatar={setAvatar} setAvatarFile={setAvatarFile} />
        <PhotosSelector
          control={control}
          setImageFilesWithDimensions={setImageFilesWithDimensions}
        />
      </Fieldset>
      <div className="flex gap-x-4">
        <Button type="submit" className="px-8 py-4 hover:text-green-400">
          Save
        </Button>
        <Button onClick={redirectToEditorMain} className="px-8 py-4 hover:text-red-500">
          Close
        </Button>
      </div>
    </form>
  )
}
