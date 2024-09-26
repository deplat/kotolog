import { Control, Controller } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { ImageWithDimensions, PetData } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'

export const AvatarSelector = ({
  control,
  setAvatar,
  setAvatarFile,
}: {
  control: Control<PetData>
  setAvatar: Dispatch<SetStateAction<ImageWithDimensions | null>>
  setAvatarFile: Dispatch<SetStateAction<File | null>>
}) => {
  const [error, setError] = useState<string | null>(null)
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    setError(null)

    if (file) {
      if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        setError('Please upload a valid JPG or JPEG image.')
        return
      }

      const MAX_FILE_SIZE = 16 * 1024 * 1024 // 16MB
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds the 5MB limit.')
        return
      }

      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const imageSrc = event.target?.result as string
        setImagePreviewSrc(imageSrc)

        const img = new Image()
        img.onload = () => {
          const width = img.width
          const height = img.height
          setAvatar({ src: imageSrc, width, height })
          setAvatarFile(file)
        }
        img.src = imageSrc
      }
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Controller
      name="avatar"
      control={control}
      render={({ field }) => (
        <div>
          <Field className="flex flex-col gap-2">
            <Label htmlFor="avatar">Avatar:</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/jpeg, image/jpg"
              ref={field.ref}
              onChange={(e) => handleImageChange(e)}
            />
            {error && <p className="text-red-600">{error}</p>}
          </Field>
          {imagePreviewSrc && (
            <div className="mt-4">
              <NextImage src={imagePreviewSrc} width={300} height={300} alt="Avatar Preview" />
            </div>
          )}
        </div>
      )}
    />
  )
}
