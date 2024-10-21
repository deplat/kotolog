import { PetList } from '@/app/admin/(modules)/pet-list'

export default async function Admin() {
  return (
    <main className="flex flex-1 px-3">
      <div className="flex w-full">
        <PetList />
      </div>
    </main>
  )
}
