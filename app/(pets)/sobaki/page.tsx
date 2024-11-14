import { getCachedDogs } from '@/data-access'
import { DogListLayout } from '@/app/(pets)/sobaki/DogListLayout'

export default async function DogsPage() {
  const dogs = await getCachedDogs()
  if (!dogs) return null
  return (
    <>
      <DogListLayout />
    </>
  )
}
