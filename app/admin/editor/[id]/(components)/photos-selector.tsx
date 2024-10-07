import { Control, Controller } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { ImageFileWithDimensions, PetData } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import NextImage from 'next/image'

export const PhotosSelector = ({
  control,
  setImageFilesWithDimensions,
}: {
  control: Control<PetData>
  setImageFilesWithDimensions: Dispatch<SetStateAction<ImageFileWithDimensions[]>>
}) => {
  const [errors, setErrors] = useState<string[]>([])
  const [photosPreviews, setPhotosPreviews] = useState<ImageFileWithDimensions[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const files = e.target.files ? Array.from(e.target.files) : []

    const imageFilePromises = files.map((file) => {
      return new Promise<ImageFileWithDimensions | string>((resolve) => {
        if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
          resolve(`${file.name}: Please upload a valid JPG or JPEG image.`)
          return
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
        if (file.size > MAX_FILE_SIZE) {
          resolve(`${file.name}: File size exceeds the 5MB limit.`)
          return
        }

        const fileReader = new FileReader()
        fileReader.onload = (event) => {
          const imageSrc = event.target?.result as string
          const img = new Image()
          img.onload = () => {
            resolve({ file, width: img.width, height: img.height, src: imageSrc })
          }
          img.onerror = () => resolve('Error loading image')
          img.src = imageSrc
        }
        fileReader.readAsDataURL(file)
      })
    })

    Promise.all(imageFilePromises).then((results) => {
      const newErrors = results.filter((result) => typeof result === 'string') as string[]
      const validImages = results.filter(
        (result) => typeof result !== 'string'
      ) as ImageFileWithDimensions[]

      setErrors(newErrors)
      setPhotosPreviews(validImages as ImageFileWithDimensions[])
      setImageFilesWithDimensions(validImages as ImageFileWithDimensions[])
      setLoading(false)
    })
  }

  return (
    <Controller
      name="photos"
      control={control}
      render={({ field }) => (
        <div>
          <Field className="flex flex-col gap-2">
            <Label htmlFor="avatars">Photos</Label>
            <Input
              id="avatars"
              type="file"
              accept="image/jpeg, image/jpg"
              multiple
              ref={field.ref}
              onChange={handleImagesChange}
            />
            {errors.length > 0 && (
              <div className="text-red-600">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </Field>
          {loading ? (
            <p>Processing photos...</p>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {photosPreviews.map((imageFile, index) => (
                <NextImage
                  key={index}
                  src={imageFile.src}
                  width={300}
                  height={300}
                  alt={`Preview ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    />
  )
}
