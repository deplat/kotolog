import { useFormContext } from 'react-hook-form'
import { Field, Fieldset, Legend, Radio, RadioGroup } from '@headlessui/react'

export const ControlledRadioGroup = ({
  legend,
  fieldKey,
  options,
}: {
  legend: string
  fieldKey: any
  options: { value: any; label: string }[]
}) => {
  const { setValue, getValues } = useFormContext()
  return (
    <Fieldset className="mb-6 flex flex-col items-center justify-center">
      <Legend className="text-2xl">{legend}:</Legend>
      <RadioGroup
        value={getValues(fieldKey)}
        onChange={(value) => setValue(fieldKey, value)}
        className="flex"
      >
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
    </Fieldset>
  )
}
