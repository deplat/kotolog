import { CatCreateBaseForm } from "@/app/admin/CatCreateBaseForm";
import { ColorCreateForm } from "@/app/admin/ColorCreateForm";
import {CatList} from "@/app/admin/CatList";
import {ColorList} from "@/app/admin/ColorList";

export default function Admin() {
    return (
        <AdminPage />
    );
}

const AdminPage = async () => {

    return (
        <main>
            <div className="flex">
                <div className="w-1/2">
                    <CatCreateBaseForm />
                </div>
                <div className="w-1/2">
                    <ColorCreateForm />
                    <ColorList/>
                </div>
            </div>
            <div>
                <div className="w-1/2">
                    <CatList/>
                </div>
            </div>
        </main>
    );
};
