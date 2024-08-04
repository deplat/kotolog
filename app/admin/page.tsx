import { getCatsForDashboard, getColorsForDashboard } from "@/lib/data";
import { unstable_cache } from "next/cache";
import {Dashboard} from "@/app/admin/Dashboard";

const getCachedColors = unstable_cache(
    async () => getColorsForDashboard(),
    ['colors'],
    {
        tags: ['colors']
    }
);

const getCachedCats = unstable_cache(
    async () => getCatsForDashboard(),
    ['cats'],
    {
        tags: ['cats']
    }
);

export default async function Admin() {
    const colors = await getCachedColors();
    const cats = await getCachedCats();

    return (
            <Dashboard colors={colors} cats={cats}/>
    );
}
