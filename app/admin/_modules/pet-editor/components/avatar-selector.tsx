import { Control, Controller } from 'react-hook-form'
import { Field, Input } from '@headlessui/react'
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
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    setError(null)
    setLoading(true)

    if (file) {
      if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        setError('Please upload a valid JPG or JPEG image.')
        setLoading(false)
        return
      }

      const MAX_FILE_SIZE = 16 * 1024 * 1024 // 16MB
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds the 16MB limit.')
        setLoading(false)
        return
      }

      try {
        const imageSrc = await readFileAsDataURL(file)
        setImagePreviewSrc(imageSrc)

        const dimensions = await getImageDimensions(imageSrc)
        setAvatar({ src: imageSrc, width: dimensions.width, height: dimensions.height })
        setAvatarFile(file)
      } catch (error) {
        setError('Error processing the image.')
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        resolve(event.target?.result as string)
      }
      fileReader.onerror = () => reject('Error reading file.')
      fileReader.readAsDataURL(file)
    })
  }

  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.src = src
    })
  }

  return (
    <Controller
      name="avatar"
      control={control}
      render={({ field }) => (
        <Field className="flex flex-col items-center justify-center gap-2">
          <div className="relative h-72 w-72 overflow-hidden rounded-lg ring-1 ring-inset ring-white">
            {imagePreviewSrc ? <NextImage src={imagePreviewSrc} alt="Select avatar" fill /> : null}
          </div>
          <Input
            id="avatar"
            type="file"
            accept="image/jpeg, image/jpg"
            ref={field.ref}
            onChange={handleImageChange}
          />
          {error && <p className="text-red-600">{error}</p>}
          {loading && <p>Processing image...</p>}
        </Field>
      )}
    />
  )
}
