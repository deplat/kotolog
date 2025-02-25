import { BottomNavbarControls } from '@/modules/nav/BottomNavbarControls'

export const BottomNavbar = async () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-90 flex justify-between bg-stone-50 px-4 py-3 text-stone-800 ring-1 ring-gray-300/85 dark:bg-gray-900 dark:text-stone-100 dark:ring-gray-300/15 sm:bottom-6 sm:left-1/2 sm:max-w-xs sm:-translate-x-1/2 sm:rounded sm:shadow-lg">
      <BottomNavbarControls />
    </nav>
  )
}
