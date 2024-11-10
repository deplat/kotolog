import { NavbarControls } from '@/app/(admin)/_modules/nav/NavbarControls'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-90 flex justify-between bg-stone-100/55 px-4 py-3 backdrop-blur dark:bg-gray-900/75 dark:ring-stone-500/50 sm:bottom-6 sm:left-1/2 sm:max-w-xs sm:-translate-x-1/2 sm:rounded sm:shadow-lg sm:ring-1 sm:ring-stone-700/50">
        <NavbarControls />
      </nav>
      <main className="flex min-h-screen justify-center bg-stone-300 pb-16 dark:bg-transparent sm:pb-24">
        {children}
      </main>
    </>
  )
}
