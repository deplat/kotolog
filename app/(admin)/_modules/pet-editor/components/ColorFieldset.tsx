import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, Field, Fieldset, Label, Legend } from '@headlessui/react'
import { IoCheckmark } from 'react-icons/io5'
import { PetColorData } from '@/types/pet'

export const ColorFieldset = ({
  fieldKey,
  label,
  colors,
}: {
  fieldKey: string
  label: string
  colors: PetColorData[]
}) => {
  const { control } = useFormContext() // Access the `control` from react-hook-form

  return (
    <Fieldset className="fieldset">
      <Legend className="mb-3 text-2xl">{label}</Legend>
      <div className="flex flex-col gap-y-3">
        <Controller
          name={fieldKey} // Connect the field to react-hook-form
          control={control}
          defaultValue={[]} // Initialize with an empty array
          render={({ field }) => (
            <>
              {colors.map((color) => {
                const isChecked = field.value.includes(color.id) // Check if the color is selected
                return (
                  <Field key={color.id} className="flex items-center gap-x-4">
                    <Checkbox
                      checked={isChecked}
                      onChange={(checked) => {
                        const updatedValue = checked
                          ? [...field.value, color.id] // Add color ID if checked
                          : field.value.filter((v: string) => v !== color.id) // Remove color ID if unchecked

                        field.onChange(updatedValue) // Update the form value
                      }}
                      className="checkbox group"
                    >
                      <IoCheckmark className="checkbox-icon" />
                    </Checkbox>
                    <Label className="cursor-pointer dark:text-stone-300">{color.name}</Label>
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
