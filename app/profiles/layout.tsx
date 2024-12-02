import { NavBar } from '@/app/profiles/NavBar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar>Profile navbar</NavBar>
      <main className="flex min-h-screen w-full justify-center px-3 pb-16 pt-3 dark:bg-transparent sm:pb-24 lg:px-6">
        {children}
      </main>
    </>
  )
}
