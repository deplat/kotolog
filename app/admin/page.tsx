import {CatCreateBaseForm} from "@/app/admin/CatCreateBaseForm";
import {ColorCreateForm} from "@/app/admin/ColorCreateForm";
import {CatList} from "@/app/admin/CatList";
import {ColorList} from "@/app/admin/ColorList";
import {auth} from "@/auth";
import NotFound from "next/dist/client/components/not-found-error";

export default function Admin() {

    return (
        <AdminPage/>
    );
}

const AdminPage = async () => {
    const session = await auth()
    if (!session?.user?.isAdmin) {
        return <NotFound/>
    }
    return (
        <div>
            <div className="flex">
                <div className="w-1/2">
                    <CatCreateBaseForm/>
                </div>
                <div className="w-1/2">
                    <ColorCreateForm/>
                    <ColorList/>
                </div>
            </div>
            <div>
                <div className="w-1/2">
                    <CatList/>
                </div>
            </div>
        </div>

    )
};
