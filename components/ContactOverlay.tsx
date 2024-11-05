import { FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import { Button } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'

const contactMethods = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/+79997855492',
    icon: <FaWhatsapp className="mr-2 inline-block" />,
  },
  {
    name: 'Telegram',
    url: 'https://t.me/+79997855492',
    icon: <FaTelegramPlane className="mr-2 inline-block" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/kotolife76',
    icon: <FaInstagram className="mr-2 inline-block" />,
  },
]

export const ContactOverlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center rounded-md bg-white p-4 shadow-lg dark:bg-gray-700">
        <h2 className="mb-2 text-2xl">Свяжитесь с нами:</h2>
        <hr className="mb-4 w-full" style={{ border: '1px solid #F35627' }} />
        <ul className="flex flex-col gap-y-3 p-3">
          {contactMethods.map((contact) => (
            <li key={contact.name} className="flex justify-center">
              <Link
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary hover w-full rounded-md px-2 py-1 text-xl hover:text-orange-600"
              >
                {contact.icon}
                {contact.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ms-auto flex">
          <Button onClick={onClose} className="ms-auto p-2 hover:underline">
            <IoClose size={30} className="hover:text-orange-600" />
          </Button>
        </div>
      </div>
    </div>
  )
}
