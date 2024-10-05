'use client'

import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Radio,
  RadioGroup,
  Textarea,
} from '@headlessui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ColorsSelector } from '../(components)/'
import { Pet, createPet, updatePet } from '../(data-access)'
import { Color, ImageWithDimensions, ImageFileWithDimensions, PetData } from '@/types'
import { Colors } from '../(data-access)'
import { IoClose, IoListCircle } from 'react-icons/io5'
import clsx from 'clsx'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PhotosSelector } from '../(components)'
import { AvatarSelector } from '../(components)'
import { uploadFileAndGetURL } from '@/lib/file-uploading'
import { ControlledCheckbox } from '../(components)'
import { router } from 'next/client'
import { getPetBySlug } from '@/app/admin/editor/[id]/(data-access)/pet'

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
    defaultValues: pet
      ? {
          id: pet.id,
          name: pet.name,
          slug: pet.slug,
          birthDate: pet.birthDate,
          gender: pet.gender,
          petType: pet.petType,
          furType: pet.furType,
          isUnclaimed: pet.isUnclaimed,
          isFeatured: pet.isFeatured,
          isAvailable: pet.isAvailable,
          isAdopted: pet.isAdopted,
          isVisible: pet.isVisible,
          socialized: pet.profile?.socialized,
          friendlyWithCats: pet.profile?.friendlyWithCats,
          friendlyWithDogs: pet.profile?.friendlyWithDogs,
          friendlyWithAnimals: pet.profile?.friendlyWithAnimals,
          litterBoxTrained: pet.profile?.litterBoxTrained,
          usesScratchingPost: pet.profile?.usesScratchingPost,
          sterilized: pet.profile?.sterilized,
          vaccinated: pet.profile?.vaccinated,
          treatedForParasites: pet.profile?.treatedForParasites,
          healthStatus: pet.profile?.healthStatus,
          healthNotes: pet.profile?.healthNotes,
          specialties: pet.profile?.specialties,
          biography: pet.profile?.biography,
          colors: pet.colors?.map((color: Color) => color.id),
          avatar: pet.avatar,
          photos: pet.photos,
        }
      : {
          birthDate: null,
          gender: 'FEMALE',
          petType: 'CAT',
          furType: null,
          isUnclaimed: false,
          isFeatured: false,
          isAvailable: true,
          isAdopted: false,
          isVisible: false,
          socialized: true,
          friendlyWithCats: true,
          friendlyWithDogs: false,
          friendlyWithAnimals: false,
          photos: [],
          healthStatus: 'UNKNOWN',
          healthNotes: [],
          specialties: [],
          sterilized: true,
          vaccinated: true,
          treatedForParasites: true,
          biography: null,
          colors: [],
          avatar: null,
        },
  })

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<ImageWithDimensions | null>(null)
  const [imageFilesWithDimensions, setImageFilesWithDimensions] = useState<
    ImageFileWithDimensions[]
  >([])

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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'mb-10 flex h-full w-full flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-200 px-4',
        'from-gray-800 to-black dark:bg-gray-800 dark:bg-gradient-to-br dark:text-stone-200'
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Fieldset className="mb-20 flex w-full flex-col items-center justify-center gap-y-2">
          <Field className="flex w-full items-center justify-center">
            <Label className="me-6 w-full text-end">Name</Label>
            <Input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={clsx(
                'ms-auto w-3/4 shrink-0 border-0 bg-transparent md:w-1/2',
                'data-[focus]:ring-2 data-[focus]:ring-orange-600'
              )}
            />
            {errors.name && (
              <div
                className={clsx(
                  'absolute rounded-xl bg-black px-8 py-4 text-red-500',
                  'bottom-5 left-5'
                )}
              >
                {errors.name.message}
              </div>
            )}
          </Field>
          <Field className="flex w-full items-center justify-center">
            <Label className="me-6 w-full text-end">Slug</Label>
            <Input
              type="text"
              {...register('slug', { required: 'Slug is required' })}
              className={clsx(
                'ms-auto w-3/4 shrink-0 border-0 bg-transparent md:w-1/2',
                'data-[focus]:ring-2 data-[focus]:ring-orange-600'
              )}
            />
            {errors.slug && (
              <span className={clsx('absolute text-red-500', 'bottom-0 left-0')}>
                {errors.slug.message}
              </span>
            )}
          </Field>
          <Field className="flex w-full items-center justify-center">
            <Label htmlFor="birthDate" className="me-6 w-full text-end">
              Birth Date
            </Label>
            <Input as="div" className="flex w-3/4 shrink-0 md:w-1/2">
              {({ focus, hover }) => (
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <DatePicker
                      id="birthDate"
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="yyyy-MM-dd"
                      className={clsx(
                        'flex w-full shrink-0 border-0 bg-transparent focus:ring-2 focus:ring-orange-600'
                      )}
                    />
                  )}
                />
              )}
            </Input>
          </Field>
        </Fieldset>
        <Fieldset className="flex w-full max-w-lg items-center">
          <Legend className="flex w-1/4 justify-self-start text-nowrap text-xl">pet type:</Legend>
          <Controller
            control={control}
            name="petType"
            render={({ field }) => (
              <RadioGroup {...field} className="flex w-1/2 justify-center">
                <Field className="flex w-1/2 justify-end">
                  <Radio
                    value="CAT"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    CAT
                  </Radio>
                </Field>
                <Field className="flex w-1/2 justify-start">
                  <Radio
                    value="DOG"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    DOG
                  </Radio>
                </Field>
              </RadioGroup>
            )}
          />
        </Fieldset>
        <Fieldset className="flex w-full max-w-lg items-center">
          <Legend className="w-1/4 text-xl">gender:</Legend>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup {...field} className="flex w-1/2 justify-center">
                <Field className="flex w-1/2 justify-end">
                  <Radio
                    value="FEMALE"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    FEMALE
                  </Radio>
                </Field>
                <Field className="flex w-1/2 justify-start">
                  <Radio
                    value="MALE"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    MALE
                  </Radio>
                </Field>
              </RadioGroup>
            )}
          />
        </Fieldset>
        <Fieldset className="mb-20 flex w-full max-w-lg flex-wrap items-center">
          <Legend className="w-1/4 text-xl">fur type:</Legend>
          <Controller
            control={control}
            name="furType"
            render={({ field }) => (
              <RadioGroup
                {...field}
                className="scrollbar-hide mx-auto flex w-1/2 min-w-fit max-w-full overflow-x-scroll"
              >
                {[null, 'SHORT', 'MEDIUM', 'LONG', 'HAIRLESS'].map((value) => (
                  <Field key={value}>
                    <Radio
                      value={value}
                      className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      {value ? value : 'NO'}
                    </Radio>
                  </Field>
                ))}
              </RadioGroup>
            )}
          />
        </Fieldset>
        <div className="flex flex-col space-y-2">
          <ControlledCheckbox control={control} errors={errors} key="isAdopted" label="adopted" />
          <ControlledCheckbox control={control} errors={errors} key="isFeatured" label="featured" />
          <ControlledCheckbox
            control={control}
            errors={errors}
            key="isAvailable"
            label="available"
          />
          <ControlledCheckbox
            control={control}
            errors={errors}
            key="isUnclaimed"
            label="unclaimed"
          />
          <ControlledCheckbox control={control} errors={errors} key="is visible" label="visible" />
        </div>
      </div>
      <div className="min-h-1/2 flex w-full items-center justify-center">
        <Fieldset className="flex w-full max-w-lg flex-col items-center justify-center space-y-2">
          <Legend className="mb-4 me-auto text-xl">health & behavior:</Legend>
          <div className="ms-4 space-y-2">
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="vaccinated"
              label="vaccinated"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="sterilized"
              label="sterilized"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="treatedForParasites"
              label="treated for parasites"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="litterBoxTrained"
              label="litter box trained"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="usesScratchingPost"
              label="uses scratching post"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="sociolized"
              label="sociolized"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="friendlyWithCats"
              label="friendly with cats"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="friendlyWithDogs"
              label="friendly with dogs"
            />
            <ControlledCheckbox
              control={control}
              errors={errors}
              key="friendlyWithAnimals"
              label="friendly with other animals"
            />
          </div>
        </Fieldset>
      </div>
      <Fieldset className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center">
        <Field className="flex h-1/2 min-h-64 w-full flex-col">
          <Label className="relative right-12 mb-2 flex items-center space-x-4 text-2xl text-gray-100">
            <IoListCircle size={32} />
            <span>biography</span>
          </Label>
          <Description className="mb-4 text-gray-600 dark:text-gray-300">
            Add an extra information about pet
          </Description>
          <Textarea
            {...register('biography')}
            className={clsx(
              'h-full flex-1 border-0 bg-transparent ring-inset data-[focus]:bg-black/75 data-[focus]:ring-1 data-[focus]:ring-orange-700'
            )}
          />
        </Field>
        <ColorsSelector colors={colors} control={control} />
        <AvatarSelector control={control} setAvatar={setAvatar} setAvatarFile={setAvatarFile} />
        <PhotosSelector
          control={control}
          setImageFilesWithDimensions={setImageFilesWithDimensions}
        />
      </Fieldset>
      <Button
        type="submit"
        className="fixed bottom-5 rounded-full bg-gray-700/45 px-8 py-4 text-lg"
      >
        Save!
      </Button>
      <Button onClick={redirectToEditorMain} className="fixed bottom-5 right-5 z-90">
        <IoClose size={24} />
      </Button>
    </form>
  )
}
