import { FaTelegramPlane, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import { siteMetadata } from '@/siteMetadata'

export const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-36 justify-center space-x-4">
          <Link className="hover:text-orange-600" href={siteMetadata.telegram}>
            <FaTelegramPlane size={24} />
          </Link>
          <Link className="hover:text-orange-600" href={siteMetadata.instagram}>
            <FaInstagram size={24} />
          </Link>
        </div>
        <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>Все права защищены</div>
        </div>
      </div>
    </footer>
  )
}
