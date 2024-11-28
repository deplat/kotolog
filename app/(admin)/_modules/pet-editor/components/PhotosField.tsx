import { useFormContext } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'
import { PetImageData, PetImageFileWithDimensions } from '@/types/pet'

interface PreviewImageData {
  file: File
  src: string
  width: number
  height: number
  isAvatar: boolean
  isPrimary: boolean
}

export const PhotosField = ({
  name,
  currentImages,
}: {
  name: string
  currentImages: PetImageData[]
  setImageFilesWithDimensions: Dispatch<SetStateAction<PetImageFileWithDimensions[]>>
}) => {
  const [imagePreviews, setImagePreviews] = useState<PreviewImageData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const {
    setValue,
    formState: { errors },
  } = useFormContext()

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
      const updatedImages = [...imagePreviews, ...resolvedImages]
      setImagePreviews(updatedImages)
      setValue(name, updatedImages) // Update form state
    })
  }

  const toggleIsAvatar = (index: number) => {
    const updatedImages = imagePreviews.map((img, i) => ({
      ...img,
      isAvatar: i === index ? !img.isAvatar : img.isAvatar,
    }))
    setImagePreviews(updatedImages)
    setValue(name, updatedImages) // Update form state
  }

  const toggleIsPrimary = (index: number) => {
    const updatedImages = imagePreviews.map((img, i) => ({
      ...img,
      isPrimary: i === index ? !img.isPrimary : img.isPrimary,
    }))
    setImagePreviews(updatedImages)
    setValue(name, updatedImages)
  }

  return (
    <div className="fieldset">
      <Field className="flex flex-col">
        <Label className="mb-3 text-2xl">Альбом:</Label>
        {currentImages && currentImages.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {currentImages.map((src, index) => (
              <div key={index}>
                <NextImage src={src} width={150} height={150} alt={`Preview ${index + 1}`} />
              </div>
            ))}
          </div>
        ) : null}
        <div className="my-3 text-xl">Добавить фотографии:</div>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files!)}
        />
        {errors.name && (
          <div className="text-red-600">
            <p>{errors.name.message as string}</p>
          </div>
        )}
      </Field>
      {loading ? (
        <p>Processing photos...</p>
      ) : (
        <ul className="mt-4 grid grid-cols-3 gap-4">
          {imagePreviews.map((img, index) => (
            <li key={index}>
              <NextImage
                key={index}
                src={img.src}
                width={300}
                height={300}
                alt={`Preview ${index + 1}`}
              />
              <div>
                <button type="button" onClick={() => toggleIsAvatar(index)}>
                  {img.isAvatar ? 'Unset Avatar' : 'Set Avatar'}
                </button>
                <button type="button" onClick={() => toggleIsPrimary(index)}>
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
