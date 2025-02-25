import Link from 'next/link'

export const TopNavbar = () => {
  return (
    <nav className="mx-auto flex max-w-6xl items-center space-x-4 p-4 sm:px-6">
      {[
        { title: 'Питомцы', href: '/admin/pets' },
        { title: 'Окрасы', href: '/admin/colors' },
        { title: 'Профили', href: '/admin/profiles' },
        { title: 'Пользователи', href: '/admin/users' },
      ].map(({ title, href }, index) => (
        <Link
          key={index}
          href={href}
          className="text-lg decoration-orange-600 decoration-2 underline-offset-4 transition-opacity duration-700 hover:underline"
        >
          {title}
        </Link>
      ))}
    </nav>
  )
}
