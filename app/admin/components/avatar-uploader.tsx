import { Control, Controller } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { PetFormData } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'

export const AvatarUpload = ({
  control,
  setAvatarFile,
}: {
  control: Control<PetFormData>
  setAvatarFile: Dispatch<SetStateAction<File | null>>
}) => {
  const [error, setError] = useState<string | null>(null)
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | null>(null)
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: never[]) => void
  ) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const imageSrc = e.target?.result as string
        setImagePreviewSrc(imageSrc)

        const img = new Image()
        img.src = imageSrc
        img.onload = () => {
          const width = img.width
          const height = img.height
          // @ts-ignore
          onChange(imageSrc, width, height)
          setAvatarFile(file)
        }
      }
      fileReader.readAsDataURL(file)
    } else {
      setError('Please upload a valid jpg or jpeg image')
    }
  }

  return (
    <Controller
      name="avatar"
      control={control}
      render={({ field }) => (
        <div>
          <Field className="flex">
            <Label>Avatar:</Label>
            <Input
              type="file"
              accept="image/jpeg, image/jpg"
              ref={field.ref}
              onChange={(e) => {
                handleImageChange(e, field.onChange)
              }}
            />
            {error && <p className="text-red-600">{error}</p>}
          </Field>
          {imagePreviewSrc && (
            <NextImage src={imagePreviewSrc} width={300} height={300} alt="Preview" />
          )}
        </div>
      )}
    />
  )
}
