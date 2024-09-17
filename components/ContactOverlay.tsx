import { FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa'

export const ContactOverlay = ({ onClose }: { onClose: () => void }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-4 shadow-lg">
        <h2 className="mb-2 text-2xl">Свяжитесь с нами:</h2>
        <hr className="mb-4" style={{ border: '1px solid #F35627' }} />
        <ul>
          {contactMethods.map((method) => (
            <li key={method.name} className="mb-4">
              <a
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary rounded-md px-2 py-1"
              >
                {method.icon}
                {method.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex">
          <button onClick={onClose} className="ms-auto px-4 py-2 hover:underline">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
