import Image, { StaticImageData } from 'next/image'
import {
  RenderThumbnailProps,
  isImageSlide,
  Slide,
  isImageFitCover,
} from 'yet-another-react-lightbox'

function isNextJsImage(slide: Slide): slide is StaticImageData {
  return isImageSlide(slide) && typeof slide.width === 'number' && typeof slide.height === 'number'
}
export default function ThumbnailImage({ slide, rect, imageFit }: RenderThumbnailProps) {
  if (!isNextJsImage(slide)) return null

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit)

  if (!isNextJsImage(slide)) return undefined

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width))
    : rect.width

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height))
    : rect.height

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? 'blur' : undefined}
        style={{
          objectFit: cover ? 'cover' : 'contain',
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  )
}
