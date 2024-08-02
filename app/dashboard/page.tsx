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
        <div className="h-screen p-4">
            <Controls colors={colors} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
                <div
                    className="flex flex-col h-fit p-4 rounded-md backdrop-blur-lg bg-white/75"
                    style={{maxHeight:"700px"}}
                >
                    <h2 className="text-xl font-semibold mb-2">кошки</h2>
                    <hr className="hr primary border-2 mb-2"/>
                    <div className="overflow-y-auto">
                        <CatList cats={cats} />
                    </div>
                </div>
                <div className="flex flex-col h-fit p-4 rounded-md backdrop-blur-lg bg-white/75"
                     style={{maxHeight:"700px"}}
                >
                    <h2 className="text-xl font-semibold mb-2">окрасы</h2>
                    <hr className="hr primary border-2 mb-2"/>
                    <div className="overflow-y-auto">
                        <ColorList colors={colors}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
