import { Control, Path, useController, FieldValues } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'
import { PetImageFileWithDimensions } from '@/types/pet'

interface PetImageData {
  id?: string
  petId?: string
  s3Key?: string
  src: string
  width: number
  height: number
  altText?: string
  isAvatar?: boolean
  isPrimary?: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface PreviewImageData {
  file: File
  src: string
  width: number
  height: number
  isAvatar: boolean
  isPrimary: boolean
}

export const ControlledImagesField = <T extends FieldValues>({
  control,
  fieldKey,
  setImageFilesWithDimensions,
}: {
  control: Control<T>
  fieldKey: Path<T>
  setImageFilesWithDimensions: Dispatch<SetStateAction<PetImageFileWithDimensions[]>>
}) => {
  const [imagePreviews, setImagePreviews] = useState<PreviewImageData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { field, fieldState } = useController({
    name: fieldKey,
    control,
  })

  // Filter current images based on the createdAt property
  const currentImages = field.value
    ? (field.value as PetImageData[]).filter((img) => img.createdAt)
    : []

  // Handle file selection, extract metadata, and create previews
  const handleFiles = (files: FileList) => {
    setLoading(true)
    const newImages = Array.from(files).map((file) => {
      const objectUrl = URL.createObjectURL(file)
      const img = new Image()
      img.src = objectUrl

      return new Promise<PreviewImageData>((resolve) => {
        img.onload = () => {
          resolve({
            file,
            src: objectUrl,
            width: img.width,
            height: img.height,
            isAvatar: false,
            isPrimary: false,
          })
          URL.revokeObjectURL(objectUrl) // Cleanup
        }
        img.onerror = () => {
          resolve({
            file,
            src: '',
            width: 0,
            height: 0,
            isAvatar: false,
            isPrimary: false,
          })
        }
      })
    })

    Promise.all(newImages).then((resolvedImages) => {
      setImagePreviews((prev) => [...prev, ...resolvedImages])
      setImageFilesWithDimensions((prev) => [
        ...prev,
        ...resolvedImages.map((img) => ({
          file: img.file,
          src: img.src,
          width: img.width,
          height: img.height,
          isAvatar: img.isAvatar,
          isPrimary: img.isPrimary,
        })),
      ])
      setLoading(false)
    })
  }

  const toggleIsAvatar = (index: number, isPreview: boolean) => {
    if (isPreview) {
      setImagePreviews((prev) =>
        prev.map((img, i) => ({
          ...img,
          isAvatar: i === index ? !img.isAvatar : img.isAvatar,
        }))
      )
      setImageFilesWithDimensions((prev) =>
        prev.map((img, i) => ({
          ...img,
          isAvatar: i === index ? !img.isAvatar : img.isAvatar,
        }))
      )
    } else {
      const updatedImages = currentImages.map((img, i) => ({
        ...img,
        isAvatar: i === index ? !img.isAvatar : img.isAvatar,
      }))
      field.onChange(updatedImages)
    }
  }

  const toggleIsPrimary = (index: number, isPreview: boolean) => {
    if (isPreview) {
      setImagePreviews((prev) =>
        prev.map((img, i) => ({
          ...img,
          isPrimary: i === index ? !img.isPrimary : false, // Ensure only one primary
        }))
      )
      setImageFilesWithDimensions((prev) =>
        prev.map((img, i) => ({
          ...img,
          isPrimary: i === index ? !img.isPrimary : false,
        }))
      )
    } else {
      const updatedImages = currentImages.map((img, i) => ({
        ...img,
        isPrimary: i === index ? !img.isPrimary : false, // Ensure only one primary
      }))
      field.onChange(updatedImages)
    }
  }

  return (
    <div className="fieldset">
      <Field className="flex flex-col">
        <Label className="mb-3 text-2xl">Альбом:</Label>

        {currentImages.length > 0 && (
          <div className="mb-6 grid grid-cols-2">
            {currentImages.map((image, index) => (
              <div key={image.id || index} className="relative">
                <NextImage
                  src={image.src}
                  width={150}
                  height={150}
                  alt={image.altText || `Image ${index + 1}`}
                />
                <div className="mt-2 flex justify-center space-x-2">
                  <button type="button" onClick={() => toggleIsAvatar(index, false)}>
                    {image.isAvatar ? 'Unset Avatar' : 'Set Avatar'}
                  </button>
                  <button type="button" onClick={() => toggleIsPrimary(index, false)}>
                    {image.isPrimary ? 'Unset Primary' : 'Set Primary'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="my-3 text-xl">Добавить фотографии:</div>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files!)}
        />
        {fieldState.error && (
          <div className="text-red-600">
            <p>{fieldState.error.message}</p>
          </div>
        )}
      </Field>

      {loading ? (
        <p>Processing photos...</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4">
          {imagePreviews.map((img, index) => (
            <li key={index}>
              <NextImage src={img.src} width={150} height={150} alt={`Preview ${index + 1}`} />
              <div className="mt-2 flex justify-center space-x-2">
                <button type="button" onClick={() => toggleIsAvatar(index, true)}>
                  {img.isAvatar ? 'Unset Avatar' : 'Set Avatar'}
                </button>
                <button type="button" onClick={() => toggleIsPrimary(index, true)}>
                  {img.isPrimary ? 'Unset Primary' : 'Set Primary'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
