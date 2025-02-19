import { BottomNavbar, TopNavbar } from '@/modules/nav'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavbar />
      <main className="flex min-h-screen w-full justify-center px-3 pb-16 pt-3 dark:bg-transparent sm:pb-24 lg:px-6">
        {children}
      </main>
      <BottomNavbar />
    </>
  )
}
