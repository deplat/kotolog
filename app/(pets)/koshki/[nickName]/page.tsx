import { prisma } from '@/prisma/prisma'
import NotFound from 'next/dist/client/components/not-found-error'
import Image from 'next/image'
import { IoCheckmark } from 'react-icons/io5'
import { getAgeFromDate } from '@/utils/getAgeFromDate'
import ContactButton from '@/components/ContactButton'
import clsx from 'clsx'
import { PhotosCarousel } from '@/components/EmblaCarousel'
import '@/app/globals.css'

async function getPetWithProfile(nickName: string) {
  const pet = await prisma.pet.findUnique({
    where: { nickName },
    include: {
      petProfile: true,
      colors: true,
      photos: true,
    },
  })

  return pet
}

export default async function CatPage(props: { params: Promise<{ nickName: string }> }) {
  const params = await props.params
  const cat = await getPetWithProfile(params.nickName)
  if (!cat) {
    return <NotFound />
  }
  const avatars = cat.photos.filter((photo) => photo.isAvatar)
  let catAge: string | undefined
  const isFemale = cat.gender === 'FEMALE'

  if (cat.birthDate !== null) {
    catAge = getAgeFromDate(cat.birthDate)
  }

  const wordEnd = () => (isFemale ? 'a' : '')

  const ListItem = ({ children }: { children: string | string[] }) => {
    return (
      <li className="mb-2 flex items-center">
        <IoCheckmark size={28} className="me-2 text-orange-600" />
        {children}
      </li>
    )
  }

  return (
    <div className="flex w-full flex-col justify-center px-4 py-[15vh] sm:px-6">
      <div className="mb-8 text-center text-2xl font-medium">Знакомьтесь — {cat.name}!</div>
      <div className="mx-auto mb-8 size-fit rounded-lg shadow-xl">
        <div className="aspect-h-1 aspect-w-1 relative w-72 overflow-hidden rounded-lg">
          <Image
            src={cat.photos.filter((photo) => photo.isPrimary)[0]?.src || ''}
            width={300}
            height={300}
            alt={cat.name}
            fill
          />
        </div>
      </div>
      {catAge && catAge !== '\u00A0' && (
        <div className="mb-8 text-center text-lg font-medium">
          {isFemale ? 'Eй' : 'Ему'} {catAge}, и {isFemale ? 'она' : 'он'}:
        </div>
      )}
      <ul className="mx-auto mb-10 max-w-fit px-4 font-medium sm:columns-2">
        {cat.petProfile?.isSocialized && <ListItem>Социализирован{wordEnd()}</ListItem>}
        {cat.petProfile?.isFriendlyWithCats && <ListItem>Ладит с другими кошками</ListItem>}
        {cat.petProfile?.isFriendlyWithDogs && <ListItem>Ладит с собаками</ListItem>}
        {cat.petProfile?.isFriendlyWithOtherAnimals && (
          <ListItem>Не против других животных</ListItem>
        )}
        {cat.petProfile?.isLitterBoxTrained && <ListItem>Приучен{wordEnd()} к лотку</ListItem>}
        {cat.petProfile?.isUsesScratchingPost && <ListItem>Пользуется&nbsp;когтеточкой</ListItem>}
        {cat.petProfile?.isSterilized && <ListItem>Стерилизован{wordEnd()}</ListItem>}
        {cat.petProfile?.isVaccinated && <ListItem>Вакцинирован{wordEnd()}</ListItem>}
        {cat.petProfile?.isTreatedForParasites && (
          <ListItem>Обработан{wordEnd()} от паразитов</ListItem>
        )}
      </ul>
      <div className="mb-10 flex justify-center">
        <ContactButton>Хочу забрать домой!</ContactButton>
      </div>
      <div className="container mx-auto max-w-7xl justify-center">
        {cat.photos.length > 0 && (
          <div className="mt-10">
            <PhotosCarousel slides={cat.photos} />
          </div>
        )}
        {cat.petProfile?.biography && (
          <div
            className={clsx(
              'mx-auto flex max-h-fit max-w-2xl rounded-lg bg-white p-4 shadow-lg ring-1 ring-inset ring-gray-600/15',
              'dark:bg-slate-700/75 dark:ring-gray-50/15'
            )}
          >
            {cat.petProfile.biography}
          </div>
        )}
      </div>
    </div>
  )
}
