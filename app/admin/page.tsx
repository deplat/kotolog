import {getCachedCats, getCachedColors} from "@/lib/data";
import {Dashboard} from "@/app/admin/Dashboard";



export default async function Admin() {
    const colors = await getCachedColors();
    const cats = await getCachedCats();

    return (
            <Dashboard colors={colors} cats={cats}/>
    );
}
