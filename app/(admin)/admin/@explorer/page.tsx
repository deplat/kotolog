import Link from 'next/link'

export default async function Page() {
  return (
    <>
      <div>
        <div>
          <h4>Home</h4>
          <Link href="/admin/pets">Pets</Link>
          <Link href="/admin/colors">Colors</Link>
        </div>
      </div>
    </>
  )
}
