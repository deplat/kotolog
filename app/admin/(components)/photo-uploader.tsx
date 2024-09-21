import { Control, Controller } from 'react-hook-form'
import { Field, Input, Label } from '@headlessui/react'
import { PetFormData } from '@/types'

export const PhotosUpload = ({ control }: { control: Control<PetFormData> }) => {
  return (
    <Controller
      control={control}
      name="photos"
      render={({ field }) => (
        <Field className="flex">
          <Label>Photos:</Label>
          <Input
            type="file"
            multiple
            ref={field.ref}
            onChange={(e) => field.onChange(e.target.files ? e.target.files : [])}
          />
        </Field>
      )}
    />
  )
}
