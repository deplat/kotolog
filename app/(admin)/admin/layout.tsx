import { NavbarControls } from '@/app/(admin)/_modules/nav/NavbarControls'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-90 flex justify-between bg-stone-50 px-4 py-3 ring-1 ring-gray-300/85 dark:bg-gray-900 sm:bottom-6 sm:left-1/2 sm:max-w-xs sm:-translate-x-1/2 sm:rounded sm:shadow-lg">
        <NavbarControls />
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-300 pb-16 dark:bg-transparent sm:pb-24">
        {children}
      </main>
    </>
  )
}
