import { Control, Controller } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { ImageWithDimensions, PetData } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'

export const PhotosSelector = ({
  control,
  setPhotosFiles,
  setPhotos,
}: {
  control: Control<PetData>
  setPhotosFiles: Dispatch<SetStateAction<File[]>>
  setPhotos: Dispatch<SetStateAction<ImageWithDimensions[]>>
}) => {
  const [errors, setErrors] = useState<string[]>([])
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([])

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    const photos: ImageWithDimensions[] = []
    const validFiles: File[] = []
    const newPreviews: string[] = []
    const errorMessages: string[] = []

    files.forEach((file) => {
      if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        errorMessages.push(`${file.name}: Please upload a valid JPG or JPEG image.`)
        return
      }

      const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
      if (file.size > MAX_FILE_SIZE) {
        errorMessages.push(`${file.name}: File size exceeds the 5MB limit.`)
        return
      }

      validFiles.push(file)

      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const imageSrc = event.target?.result as string
        newPreviews.push(imageSrc)

        const img = new Image()
        img.onload = () => {
          const width = img.width
          const height = img.height
          photos.push({ src: imageSrc, width, height })
        }
      }
      fileReader.readAsDataURL(file)
    })

    // Set state for previews and errors
    setPhotosPreviews(newPreviews)
    setErrors(errorMessages)
    setPhotos(photos)
    setPhotosFiles(validFiles)
  }

  return (
    <Controller
      name="photos"
      control={control}
      render={({ field }) => (
        <div>
          <Field className="flex flex-col gap-2">
            <Label htmlFor="avatars">Avatars:</Label>
            <Input
              id="avatars"
              type="file"
              accept="image/jpeg, image/jpg"
              multiple
              ref={field.ref}
              onChange={(e) => handleImagesChange(e)}
            />
            {errors.length > 0 && (
              <div className="text-red-600">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </Field>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {photosPreviews.map((src, index) => (
              <NextImage
                key={index}
                src={src}
                width={300}
                height={300}
                alt={`Preview ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    />
  )
}
