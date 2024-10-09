'use client'

import { useCallback, useState } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ImageWithDimensions } from '@/types'
import Image from 'next/image'
import { Thumbnails } from 'yet-another-react-lightbox/plugins'
import NextJsImage from '@/components/nextjs-image'
import ThumbnailImage from '@/components/thumbnail-image'
import { Lightbox } from 'yet-another-react-lightbox'
import { DotButton, useDotButton } from './embla-carousel-dot-button'
import { PrevButton, NextButton, usePrevNextButtons } from './embla-carousel-arrow-button'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

type PropType = {
  slides: ImageWithDimensions[]
  options?: EmblaOptionsType
}

export const PhotosCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onNavButtonClick)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick)

  const toggleOpen = (state: boolean, index: number) => () => {
    setIndex(index)
    setOpen(state)
  }
  const updateIndex = ({ index: current }: { index: number }) => {
    setIndex(current)
  }

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((photo, index) => (
            <div
              className="embla__slide flex shrink-0 grow-0 basis-1/2 cursor-pointer items-center pb-7 pl-2.5 sm:basis-1/3 sm:pl-4 md:basis-1/4"
              key={index}
            >
              <Image
                src={photo.src}
                alt={'Фото кошки'}
                width={photo.width}
                height={photo.height}
                className="rounded-lg shadow-lg"
                loading="eager"
                onClick={toggleOpen(true, index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? 'embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div>
      <Lightbox
        open={open}
        plugins={[Thumbnails]}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: updateIndex }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        render={{ slide: NextJsImage, thumbnail: ThumbnailImage }}
        thumbnails={{
          imageFit: 'cover',
        }}
      />
    </section>
  )
}
