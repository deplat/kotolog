// LightboxClient.tsx
'use client';
import "yet-another-react-lightbox/styles.css";
import { Lightbox } from "yet-another-react-lightbox";
import  Inline  from "yet-another-react-lightbox/plugins/inline";
import {useState} from "react";
import NextJsImage from "@/app/cats/[id]/NextJsImage";

interface Photo {
    src: string;
    width: number;
    height: number;
}

interface LightboxClientProps {
    photos: Photo[];
}

export default function LightboxClient({ photos }: LightboxClientProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const toggleOpen = (state: boolean) => () => setOpen(state);

    const updateIndex = ({ index: current }: { index: number }) =>
        setIndex(current);

    const slides = photos.map(photo => ({
        src: photo.src,
        width: photo.width,
        height: photo.height,
        alt: photo.src,
    }));

    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>
                Open Lightbox
            </button>

            <Lightbox
                render={{ slide: NextJsImage }}
                index={index}
                slides={slides}
                plugins={[Inline]}
                on={{
                    view: updateIndex,
                    click: toggleOpen(true),
                }}
                carousel={{
                    padding: 0,
                    spacing: 0,
                    imageFit: "cover",
                }}
                inline={{
                    style: {
                        width: "100%",
                        maxWidth: "900px",
                        aspectRatio: "3 / 2",
                        margin: "0 auto",
                    },
                }}
            />

            <Lightbox
                open={open}
                close={toggleOpen(false)}
                index={index}
                slides={slides}
                on={{ view: updateIndex }}
                animation={{ fade: 0 }}
                controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                render={{ slide: NextJsImage }}
            />
        </>
    );
}