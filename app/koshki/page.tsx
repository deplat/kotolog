import {getCachedCats, getCachedListOfUniqueColorsFromCats} from "@/lib/data";
import {CatsList} from "@/app/koshki/CatsList";

export default async function CatsPage() {
    const cats = await getCachedCats()
    const uniqueColors = await getCachedListOfUniqueColorsFromCats()
    return (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">кошки</h2>
                    <CatsList initialCats={cats} uniqueColors={uniqueColors}/>
            </div>
    )
}