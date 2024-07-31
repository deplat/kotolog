'use client'

import {PetCreationForm} from "@/app/admin/PetCreationForm";
import {useState} from "react";
import {Dashboard} from "@/app/admin/Dashboard";

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

    return (
        <div>
            <div className='fixed grid w-screen mt-36 z-40'>
                {isPetCreationFormVisible && <PetCreationForm/>}
            </div>
            <div className="flex h-screen">
                <Dashboard/>

                <div className='fixed bottom-0 z-50'>
                    <button onClick={handlePetCreationFormVisible}>
                        {isPetCreationFormVisible ? '- Питомец' : '+ Питомец'}
                    </button>
                </div>
            </div>
        </div>
    );
};
