// ContactButton.tsx
'use client'

import { Button, type ButtonProps } from '@headlessui/react'
import { useState } from 'react'
import { ContactOverlay } from '@/components/ContactOverlay'
import clsx from 'clsx'

const ContactButton = ({ children }: ButtonProps) => {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <>
      <Button
        className={clsx(
          'relative rounded-md border-2 px-5 py-2 text-lg font-semibold shadow-lg transition duration-200',
          'border-orange-600 bg-white text-orange-600 dark:bg-transparent',
          'data-[hover]:scale-110 data-[hover]:bg-orange-600 data-[hover]:text-gray-50 dark:data-[hover]:bg-orange-600'
        )}
        onClick={() => setShowOverlay(true)}
      >
        {children}
      </Button>
      {showOverlay && <ContactOverlay onClose={() => setShowOverlay(false)} />}
    </>
  )
}

export default ContactButton
