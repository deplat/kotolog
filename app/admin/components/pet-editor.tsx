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
  Checkbox,
} from '@headlessui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Colors } from '../data-access/color'
import DatePicker from 'react-datepicker'
import { IoClose, IoListCircle, IoCheckmark } from 'react-icons/io5'
import clsx from 'clsx'
import { PetFormData } from '@/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkSlugUnique } from '@/lib/checkSlug'
import { createPet, Pet, updatePet } from '../data-access/pet'
import 'react-datepicker/dist/react-datepicker.css'
import { AvatarUpload } from '@/app/admin/components/avatar-uploader'
import { ColorsField } from '@/app/admin/components/colors-field'

interface PetEditFormProps {
  pet?: Pet
  colors: Colors
  closeForm: () => void
}

export const PetEditForm = ({ pet, colors, closeForm }: PetEditFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<PetFormData>({
    defaultValues: pet
      ? {
          avatar: pet.avatar,
          name: pet.name,
          slug: pet.slug,
          birthDate: pet.birthDate,
          gender: pet.gender,
          petType: pet.petType,
          furType: pet.furType,
          isUnclaimed: pet.isUnclaimed,
          isFeatured: pet.isFeatured,
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
          biography: pet.profile?.biography,
          colors: pet.colors?.map((color) => color.id),
        }
      : {
          petType: 'CAT',
          birthDate: null,
          gender: 'FEMALE',
          furType: null,
          isUnclaimed: false,
          isFeatured: false,
          isAvailable: true,
          isAdopted: false,
          isVisible: false,
          colors: [],
          avatar: null,
          photos: [],
          biography: null,
          healthStatus: 'UNKNOWN',
          sterilized: true,
          vaccinated: true,
          treatedForParasites: true,
          socialized: true,
          friendlyWithCats: true,
          friendlyWithDogs: false,
          friendlyWithAnimals: false,
        },
  })

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUploaded, setAvatarUploaded] = useState<boolean>(false)
  const [slugError, setSlugError] = useState('')
  const [selectedColors, setSelectedColors] = useState<number[]>([])
  const router = useRouter()

  const watchSlug = watch('slug')

  useEffect(() => {
    const checkSlug = async (slug: string) => {
      try {
        const isUnique = await checkSlugUnique(slug)
        if (!isUnique) {
          setSlugError('Slug is already in use')
          setError('slug', { type: 'custom', message: 'Slug is already in use' })
        } else {
          setSlugError('')
          clearErrors('slug')
        }
      } catch (error) {
        setSlugError('Error checking Slug')
      }
    }
    if (watchSlug) {
      checkSlug(watchSlug)
    }
  }, [clearErrors, setError, watchSlug])

  const toggleColorSelection = (colorId: number) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(colorId)
        ? prevColors.filter((id) => id !== colorId)
        : [...prevColors, colorId]
    )
  }

  const onSubmit: SubmitHandler<PetFormData> = async (data) => {
    if (slugError) return
    if (avatarFile) {
      try {
        // 1. Get pre-signed URL for uploading to S3
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename: avatarFile.name, contentType: avatarFile.type }),
        })
        if (response.ok) {
          const { url, fields } = await response.json()
          console.log(url, fields.key)
          const avatarUploadFormData = new FormData()
          Object.entries(fields).forEach(([key, value]) => {
            avatarUploadFormData.append(key, value as string)
          })
          avatarUploadFormData.append('file', avatarFile)

          const uploadResponse = await fetch(url, {
            method: 'POST',
            body: avatarUploadFormData,
          })

          if (uploadResponse.ok) {
            setAvatarUploaded(true)
            console.log(avatarUploaded)
            setValue('avatar.src', url + fields.key)
          } else {
            console.error('S3 Upload Error:', uploadResponse)
          }
        }
      } catch (error) {
        console.log((error as Error).message)
      }
    }

    const formattedData: PetFormData = {
      ...data,
      colors: selectedColors,
    }

    console.log(formattedData)

    if (!pet?.id) {
      const createdPet = await createPet(formattedData)
      console.log(createdPet)
    }
    if (pet) {
      const updatedPet = await updatePet(pet.id, formattedData)
      console.log(updatedPet)
    }
    router.refresh()
  }
  const renderCheckbox = (key: any, label: string) => (
    <Controller
      control={control}
      name={key}
      render={({ field }) => (
        <Field className="flex w-full items-center space-x-4">
          <Checkbox
            checked={field.value}
            onChange={field.onChange}
            className={clsx(
              'group size-6 rounded-md bg-gray-800/15 p-0.5 ring-1 ring-inset ring-white/15',
              'date-[checked]:bg-orange-500 data-[checked]:text-white dark:data-[checked]:bg-orange-600'
            )}
          >
            <IoCheckmark className="hidden size-5 group-data-[checked]:block" />
          </Checkbox>
          <Label className="dark:text-stone-300">{label}</Label>
        </Field>
      )}
    />
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'flex h-full w-full flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-200 px-4',
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
                'data-[focus]:ring-600 data-[focus]:ring-2'
              )}
            />
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
                <Field>
                  <Radio
                    value={null}
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    NO
                  </Radio>
                </Field>
                <Field>
                  <Radio
                    value="SHORT"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    SHORT
                  </Radio>
                </Field>
                <Field>
                  <Radio
                    value="MEDIUM"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    MEDIUM
                  </Radio>
                </Field>
                <Field>
                  <Radio
                    value="LONG"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    LONG
                  </Radio>
                </Field>
                <Field>
                  <Radio
                    value="HAIRLESS"
                    className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    HAIRLESS
                  </Radio>
                </Field>
              </RadioGroup>
            )}
          />
        </Fieldset>
        <div className="flex flex-col space-y-2">
          {renderCheckbox('isAdopted', 'adopted')}
          {renderCheckbox('isFeatured', 'featured')}
          {renderCheckbox('isAvailable', 'available')}
          {renderCheckbox('isUnclaimed', 'unclaimed')}
          {renderCheckbox('isVisible', 'visible')}
        </div>
      </div>
      <div className="min-h-1/2 flex w-full items-center justify-center">
        <Fieldset className="flex w-full max-w-lg flex-col items-center justify-center space-y-2">
          <Legend className="mb-4 me-auto text-xl">health & behavior:</Legend>
          <div className="ms-4 space-y-2">
            {renderCheckbox('vaccinated', 'vaccinated')}
            {renderCheckbox('sterilized', 'sterilized')}
            {renderCheckbox('treatedForParasites', 'treated for parasites')}
            {renderCheckbox('litterBoxTrained', 'litter box trained')}
            {renderCheckbox('usesScratchingPost', 'uses scratching post')}
            {renderCheckbox('socialized', 'socialized')}
            {renderCheckbox('friendlyWithCats', 'friendly with cats')}
            {renderCheckbox('friendlyWithDogs', 'friendly with dogs')}
            {renderCheckbox('friendlyWithAnimals', 'friendly with animals')}
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
        <ColorsField colors={colors} control={control} />
        <AvatarUpload control={control} setAvatarFile={setAvatarFile} />
      </Fieldset>
      <Button
        type="submit"
        className="fixed bottom-5 rounded-full bg-gray-700/45 px-8 py-4 text-lg"
      >
        Save
      </Button>
      <Button onClick={closeForm} className="fixed bottom-5 right-5">
        <IoClose size={24} />
      </Button>
    </form>
  )
}