import { NavBar } from '@/app/profiles/NavBar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar>Profile navbar</NavBar>
      <main>{children}</main>
    </>
  )
}
