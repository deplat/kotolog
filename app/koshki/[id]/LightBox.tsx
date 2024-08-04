// LightboxClient.tsx
'use client';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Lightbox } from "yet-another-react-lightbox";
import  Inline  from "yet-another-react-lightbox/plugins/inline";
import {useState} from "react";
import NextJsImage from "@/app/koshki/[id]/NextJsImage";
import {Thumbnails} from "yet-another-react-lightbox/plugins";
import ThumbnailImage from "@/app/koshki/[id]/ThumbnailImage";

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
            <Lightbox
                styles={{
                    container: {
                        backgroundColor: "transparent",
                    },
                }}
                render={{ slide: NextJsImage}}
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
                    preload: 5,
                  //  imageFit: "cover",
                }}
                inline={{
                    style: {
                        maxWidth:"80rem",
                        aspectRatio: "3/2",
                        margin: "1.5rem auto",
                    },
                }}
            />

            <Lightbox
                open={open}
                plugins={[Thumbnails]}
                close={toggleOpen(false)}
                index={index}
                slides={slides}
                on={{ view: updateIndex }}
                animation={{ fade: 0 }}
                controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                render={{ slide: NextJsImage, thumbnail: ThumbnailImage }}
                thumbnails={{
                    imageFit: "cover",
                }
                }
            />
        </>
    );
}