import { Control, Controller } from 'react-hook-form'
import { PetData } from '@/types'
import { Colors } from '@/app/admin/_data-access/color'
import { Fieldset, Label, Legend } from '@headlessui/react'

export const ColorsSelector = ({
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
      <Fieldset className="form-group mb-6 flex flex-col items-center justify-center">
        <Legend className="text-2xl">Colors:</Legend>
        <div className="flex space-x-4">
          {colors.map((color) => (
            <Label key={color.id} className="flex items-center">
              <input
                type="checkbox"
                value={color.id}
                checked={field.value.includes(color.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    field.onChange([...field.value, color.id])
                  } else {
                    field.onChange(field.value.filter((v) => v !== color.id))
                  }
                }}
              />
              <span className="ml-2">{color.name}</span>
            </Label>
          ))}
        </div>
      </Fieldset>
    )}
  />
)
