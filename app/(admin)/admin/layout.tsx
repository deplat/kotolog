import { Navbar } from '@/app/(admin)/_modules/nav/Navbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-grow justify-center">{children}</main>
    </>
  )
}
