import { getCatsForDashboard, getColorsForDashboard } from "@/lib/data";
import {CatList} from "@/app/dashboard/CatList";
import {ColorList} from "@/app/dashboard/ColorList";
import { unstable_cache } from "next/cache";
import Controls from "@/app/dashboard/Controls";

const getCachedColors = unstable_cache(
    async () => getColorsForDashboard(),
    ['dashboard-colors'],
    {
        tags: ['dashboard-colors']
    }
);

const getCachedCats = unstable_cache(
    async () => getCatsForDashboard(),
    ['dashboard-cats'],
    {
        tags: ['dashboard-cats']
    }
);

export default async function Dashboard() {
    const colors = await getCachedColors();
    const cats = await getCachedCats();

    return (
        <div className="h-screen">
            <Controls colors={colors} />
            <div className="flex w-full h-1/2 gap-x-4 p-4">
                <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2">Cats</h2>
                    <hr className="mb-2"/>
                    <div className="h-full overflow-y-auto">
                        <CatList cats={cats} />
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2">Colors</h2>
                    <hr className="mb-2"/>
                    <div className="h-full overflow-y-auto">
                        <ColorList colors={colors} />
                    </div>
                </div>
            </div>
        </div>
    );
}
