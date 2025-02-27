import { PetColorData } from '@/types/pet'

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { IoCheckmark } from 'react-icons/io5'
import { Fieldset, Legend, Field, Checkbox, Label } from '@headlessui/react'

interface ControlledColorsFieldsetProps<T extends FieldValues> {
  control: Control<T>
  fieldKey: Path<T>
  label: string
  colors: PetColorData[]
}

export const ColorFieldset = <T extends FieldValues>({
  control,
  fieldKey,
  label,
  colors,
}: ControlledColorsFieldsetProps<T>) => {
  return (
    <Fieldset className="fieldset">
      <Legend className="mb-3 text-2xl">{label}</Legend>
      <div className="flex flex-col gap-y-3">
        <Controller
          name={fieldKey}
          control={control}
          render={({ field }) => (
            <>
              {colors.map(({ id, name }) => {
                const isChecked = field.value.some((item: { id: string }) => item.id === id) // Check if the color is selected

                const handleCheckboxChange = (checked: boolean) => {
                  let updatedValue
                  if (checked) {
                    // Add color object if checked
                    updatedValue = [...field.value, { id, name }]
                  } else {
                    // Remove color object if unchecked
                    updatedValue = field.value.filter((value: { id: string }) => value.id !== id)
                  }
                  field.onChange(updatedValue) // Update the form value
                }

                return (
                  <Field key={id} className="flex items-center gap-x-4">
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="checkbox group"
                    >
                      <IoCheckmark className="checkbox-icon" />
                    </Checkbox>
                    <Label className="cursor-pointer dark:text-stone-300">{name}</Label>
                  </Field>
                )
              })}
            </>
          )}
        />
      </div>
    </Fieldset>
  )
}
