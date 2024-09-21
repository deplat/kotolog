import { Control, Controller } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { PetData } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'

export const PhotosSelector = ({
  control,
  photosFiles,
  setPhotosFiles,
}: {
    control: Control<PetData>
  photosFiles: File[]
  setPhotosFiles: Dispatch<SetStateAction<File[]>>
}) => {
  const [error, setError] = useState<string | null>(null)
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | null>(null)
  const handleImagesChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      let i: number
      const files = []
      for (i = 0; i < e.target.files.length; i += 1) {
        files[i] = e.target.files[i].arrayBuffer()
      }
      const processedFiles = files.map((file) => {
        const fileReader = new FileReader
        fileReader.onload = (e) => {
          const imageSrc = e.target?.result as string
          const img = new Image()
          img.src = imageSrc
          img.onload = () => {
            const width = img.width
            const height = img.height
          }
        }
      }
      )

    } else {
      setError('Select valid "jpg" or "jpeg" images')
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
              multiple
              accept="image/jpeg, image/jpg"
              ref={field.ref}
              onChange={handleImagesChange}
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
