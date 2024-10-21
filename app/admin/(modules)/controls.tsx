import { Button } from '@headlessui/react'
import clsx from 'clsx'

export const Controls = () => {
  return (
    <div className="flex w-full items-center border-t border-black px-4">
      {[{ label: 'Add Pet' }, { label: 'Add Color' }].map((item, index) => (
        <Button
          key={index}
          className={clsx(
            'bg-stone-950 px-4 py-2.5 text-stone-100 underline-offset-4 transition-all duration-100',
            'data-[hover]:bg-transparent data-[hover]:text-stone-950 data-[hover]:underline'
          )}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
