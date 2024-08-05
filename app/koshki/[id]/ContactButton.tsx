// ContactButton.tsx
'use client';

import { useState } from "react";
import {ContactOverlay} from "@/components/ContactOverlay";

const ContactButton = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <>
            <button className='btn secondary px-5 py-2 rounded-md' onClick={() => setShowOverlay(true)}>
                Хочу забрать домой!
            </button>
            {showOverlay && <ContactOverlay onClose={() => setShowOverlay(false)} />}
        </>
    );
};

export default ContactButton;
