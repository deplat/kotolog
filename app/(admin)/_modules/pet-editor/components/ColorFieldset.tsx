import { Control, Controller } from 'react-hook-form'
import { Color, PetData } from '@/types'
import { Checkbox, Field, Fieldset, Label, Legend } from '@headlessui/react'
import { Colors } from '@/data-access'
import { IoCheckmark } from 'react-icons/io5'

export const ColorFieldset = ({
  control,
  colors,
}: {
  control: Control<PetData>
  colors: Colors
}) => (
  <Controller
    control={control}
    name="colors"
    render={({ field }) => (
      <Fieldset className="fieldset mb-6">
        <Legend className="mb-3 text-2xl">Окрасы:</Legend>
        <div className="flex flex-col gap-y-3">
          {colors.map((color: Color) => (
            <Field key={color.id} className="flex items-center gap-x-4">
              <Checkbox
                value={color.id}
                checked={field.value.includes(color.id)}
                onChange={(checked) => {
                  if (checked) {
                    field.onChange([...field.value, color.id])
                  } else {
                    field.onChange(field.value.filter((v) => v !== color.id))
                  }
                }}
                className="checkbox group"
              >
                <IoCheckmark className="checkbox-icon" />
              </Checkbox>
              <Label className="cursor-pointer dark:text-stone-300">{color.name}</Label>
            </Field>
          ))}
        </div>
      </Fieldset>
    )}
  />
)
