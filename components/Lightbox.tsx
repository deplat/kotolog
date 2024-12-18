// LightboxClient.tsx
'use client'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import { Lightbox } from 'yet-another-react-lightbox'
import Inline from 'yet-another-react-lightbox/plugins/inline'
import { useState } from 'react'
import NextjsImage from '@/components/NextjsImage'
import { Thumbnails } from 'yet-another-react-lightbox/plugins'
import ThumbnailImage from '@/components/ThumbnailImage'

interface Photo {
  src: string
  width: number
  height: number
}

interface LightboxClientProps {
  photos: Photo[]
}

export default function LightboxClient({ photos }: LightboxClientProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const toggleOpen = (state: boolean) => () => setOpen(state)

  const updateIndex = ({ index: current }: { index: number }) => setIndex(current)

  const slides = photos.map((photo) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.src,
  }))

  return (
    <>
      <Lightbox
        styles={{
          container: {
            backgroundColor: 'transparent',
          },
        }}
        render={{ slide: NextjsImage }}
        index={index}
        slides={slides}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 40,
          spacing: 0,
          preload: 5,
          //  imageFit: "cover",
        }}
        inline={{
          style: {
            maxWidth: '80rem',
            aspectRatio: '3/2',
            margin: '0 auto',
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
        render={{ slide: NextjsImage, thumbnail: ThumbnailImage }}
        thumbnails={{
          imageFit: 'cover',
        }}
      />
    </>
  )
}
