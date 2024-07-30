'use client'

import {PetCreationForm} from "@/app/admin/CatCreateBaseForm";
import {ColorCreateForm} from "@/app/admin/ColorCreateForm";
import {CatList} from "@/app/admin/CatList";
import {ColorList} from "@/app/admin/ColorList";
import {auth} from "@/auth";
import NotFound from "next/dist/client/components/not-found-error";
import {useState} from "react";

export default function Admin() {

    return (
        <AdminPage/>
    );
}

const AdminPage =  () => {
    const [isPetCreationFormVisible, setIsPetCreationFormVisible] = useState(false);
    const handlePetCreationFormVisible = () => {
        setIsPetCreationFormVisible((prev) => !prev);
    };

   // const session = await auth()
   // if (!session?.user?.isAdmin) {
   //     return <NotFound/>
   // }

    return (
        <div>
            <div className='fixed grid w-screen mt-36 z-40'>
                {isPetCreationFormVisible && <PetCreationForm/>}
            </div>
            <div className="flex h-screen">


                <div className='mt-auto z-50'>
                    <button onClick={handlePetCreationFormVisible}>
                        {isPetCreationFormVisible ? '- Питомец' : '+ Питомец'}
                    </button>
                </div>
            </div>
        </div>
    );
};
