import { Navbar } from '@/app/(admin)/_modules/nav/Navbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <main className="flex flex-grow flex-col lg:flex-row">{children}</main>
      <Navbar />
    </div>
  )
}
