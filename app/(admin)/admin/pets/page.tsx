import { PetList } from '@/app/(admin)/_modules/pet-list'
import { Suspense } from 'react'

export default async function Pets() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Suspense>
        <PetList />
      </Suspense>
    </div>
  )
}
