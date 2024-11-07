import { CatListLayout } from '@/app/(pets)/koshki/_components/CatListLayout'
import { getCachedCats, getCachedListOfUniqueColorsFromCats } from '@/data-access'

export default async function CatsPage() {
  const cats = await getCachedCats()
  const uniqueColors = await getCachedListOfUniqueColorsFromCats()
  return (
    <>
      <CatListLayout initialCats={cats} uniqueColors={uniqueColors} />
    </>
  )
}
