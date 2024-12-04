import { Control, Path, useController, FieldValues } from 'react-hook-form'
import { Button, Field, Input, Label } from '@headlessui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'
import { PetImageFileWithDimensions } from '@/types/pet'
import clsx from 'clsx'
import { Trash } from 'lucide-react'

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
  setDeletedPhotosIds,
}: {
  control: Control<T>
  fieldKey: Path<T>
  setDeletedPhotosIds: Dispatch<SetStateAction<string[]>>
  setImageFilesWithDimensions: Dispatch<SetStateAction<PetImageFileWithDimensions[]>>
}) => {
  const [imagePreviews, setImagePreviews] = useState<PreviewImageData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { field, fieldState } = useController({
    name: fieldKey,
    control,
  })

  const currentImages = field.value
    ? (field.value as PetImageData[]).filter((img) => img.createdAt)
    : []

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
          isPrimary: i === index ? !img.isPrimary : false,
        }))
      )
      setImageFilesWithDimensions((prev) =>
        prev.map((img, i) => ({
          ...img,
          isPrimary: i === index ? !img.isPrimary : false,
        }))
      )
      const updatedCurrentImages = currentImages.map((img) => ({
        ...img,
        isPrimary: false,
      }))
      field.onChange(updatedCurrentImages)
    } else {
      const updatedImages = currentImages.map((img, i) => ({
        ...img,
        isPrimary: i === index ? !img.isPrimary : false,
      }))
      field.onChange(updatedImages)
      setImagePreviews((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: false,
        }))
      )
      setImageFilesWithDimensions((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: false,
        }))
      )
    }
  }

  const toggleDelete = (index: number, isPreview: boolean) => {
    if (isPreview) {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index))
      setImageFilesWithDimensions((prev) => prev.filter((_, i) => i !== index))
    } else {
      const photoToDelete = currentImages[index]
      if (photoToDelete.id) {
        setDeletedPhotosIds((prev) => [...prev, photoToDelete.id as string])
      }
      const updatedImages = currentImages.filter((_, i) => i !== index)
      field.onChange(updatedImages)
    }
  }

  return (
    <div className="fieldset">
      <Field className="flex flex-col">
        <Label className="mb-3 text-2xl">Альбом:</Label>

        {currentImages.length > 0 && (
          <ul className="mb-6 flex flex-wrap gap-3">
            {currentImages.map((image, index) => (
              <li key={image.id || index} className="flex flex-col items-center">
                <NextImage
                  src={image.src}
                  width={150}
                  height={150}
                  alt={image.altText || `Image ${index + 1}`}
                />
                <div className="mt-2 flex justify-center space-x-2">
                  <Button
                    className={clsx('rounded p-2', image.isAvatar ? 'bg-rose-300' : '')}
                    type="button"
                    onClick={() => toggleIsAvatar(index, false)}
                  >
                    Аватар
                  </Button>
                  <Button
                    className={clsx('rounded p-2', image.isPrimary ? 'bg-rose-500 text-white' : '')}
                    type="button"
                    onClick={() => toggleIsPrimary(index, false)}
                  >
                    Основное
                  </Button>
                  <Button onClick={() => toggleDelete(index, false)}>
                    <Trash size={30} absoluteStrokeWidth />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
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
        <ul className="mb-6 mt-4 flex flex-wrap gap-3">
          {imagePreviews.map((img, index) => (
            <li key={index} className="flex flex-col items-center">
              <NextImage src={img.src} width={150} height={150} alt={`Preview ${index + 1}`} />
              <div className="mt-2 flex justify-center space-x-2">
                <Button
                  className={clsx('rounded p-2', img.isAvatar ? 'bg-rose-300' : '')}
                  type="button"
                  onClick={() => toggleIsAvatar(index, true)}
                >
                  Аватар
                </Button>
                <Button
                  className={clsx('rounded p-2', img.isPrimary ? 'bg-rose-500 text-white' : '')}
                  type="button"
                  onClick={() => toggleIsPrimary(index, true)}
                >
                  Основное
                </Button>
                <Button onClick={() => toggleDelete(index, true)}>
                  <Trash size={30} absoluteStrokeWidth />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
