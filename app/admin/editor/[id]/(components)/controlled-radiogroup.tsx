import { Control, Controller } from 'react-hook-form'
import { PetData } from '@/types'
import { Field, Fieldset, Legend, Radio, RadioGroup } from '@headlessui/react'

export const ControlledRadioGroup = ({
  legend,
  fieldKey,
  options,
  control,
}: {
  legend: string
  fieldKey: any
  options: { value: any; label: string }[]
  control: Control<PetData>
}) => {
  return (
    <Fieldset>
      <Legend>{legend}</Legend>
      <Controller
        control={control}
        name={fieldKey}
        render={({ field }) => (
          <RadioGroup {...field} className="flex">
            {options.map((option, index) => (
              <Field key={index} className="flex">
                <Radio
                  value={option.value}
                  className="group relative flex cursor-pointer p-2 text-xl text-gray-300 transition focus:outline-none data-[checked]:text-orange-600 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  {option.label}
                </Radio>
              </Field>
            ))}
          </RadioGroup>
        )}
      />
    </Fieldset>
  )
}
