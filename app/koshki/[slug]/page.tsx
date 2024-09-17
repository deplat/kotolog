import prisma from '@/lib/prisma'
import NotFound from 'next/dist/client/components/not-found-error'
import Image from 'next/image'
import { getAge } from '@/lib/helpers'
import ContactButton from '@/components/ContactButton'
import { PhotosCarousel } from '@/app/koshki/[slug]/embla-carousel'
import '@/app/globals.css'
import clsx from 'clsx'
import { IoCheckmark } from 'react-icons/io5'

async function getPetWithProfile(slug: string) {
  return prisma.pet.findUnique({
    where: { slug },
    include: {
      avatar: true,
      photos: true,
      profile: {
        include: {
          healthNotes: true,
          specialties: true,
        },
      },
    },
  })
}

export default async function CatPage({ params }: { params: { slug: string } }) {
  const cat = await getPetWithProfile(params.slug)
  if (!cat) {
    return <NotFound />
  }

  let catAge: string | undefined
  const isFemale = cat.gender === 'FEMALE'

  if (cat.birthDate !== null) {
    catAge = getAge(cat.birthDate)
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
      <div className="mx-auto mb-8 h-fit w-fit rounded-lg shadow-xl">
        <div className="aspect-h-1 aspect-w-1 relative w-72 overflow-hidden rounded-lg">
          <Image
            src={
              cat.avatar?.src ||
              'https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main'
            }
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
        {cat.profile?.socialized && <ListItem>Социализирован{wordEnd()}</ListItem>}
        {cat.profile?.friendlyWithCats && <ListItem>Ладит с другими кошками</ListItem>}
        {cat.profile?.friendlyWithDogs && <ListItem>Ладит с собаками</ListItem>}
        {cat.profile?.friendlyWithAnimals && <ListItem>Не против других животных</ListItem>}
        {cat.profile?.litterBoxTrained && <ListItem>Приучен{wordEnd()} к лотку</ListItem>}
        {cat.profile?.usesScratchingPost && <ListItem>Пользуется&nbsp;когтеточкой</ListItem>}
        {cat.profile?.sterilized && <ListItem>Стерилизован{wordEnd()}</ListItem>}
        {cat.profile?.vaccinated && <ListItem>Вакцинирован{wordEnd()}</ListItem>}
        {cat.profile?.treatedForParasites && <ListItem>Обработан{wordEnd()} от паразитов</ListItem>}
      </ul>
      <div className="mb-10 flex justify-center">
        <ContactButton>Хочу забрать домой!</ContactButton>
      </div>
      <div className="container mx-auto max-w-7xl justify-center">
        <div className="flex flex-col flex-wrap justify-center gap-3 md:flex-row md:gap-6">
          {cat.profile?.healthNotes && cat.profile.healthNotes.length > 0 && (
            <div
              className={clsx(
                'flex-1 rounded-lg bg-white p-4 shadow-lg ring-1 ring-inset ring-gray-600/15',
                'dark:bg-slate-700/75 dark:ring-gray-50/15'
              )}
            >
              Про здоровье:
              <hr className="border border-orange-600" />
              <ul className="mt-3.5">
                {cat.profile.healthNotes.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
          {cat.profile?.specialties && cat.profile.specialties.length > 0 && (
            <div
              className={clsx(
                'max-w-2xl flex-1 rounded-lg bg-white p-4 shadow-lg ring-1 ring-inset ring-gray-600/15',
                'dark:bg-slate-700/75 dark:ring-gray-50/15'
              )}
            >
              Характер и привычки:
              <hr className="border border-orange-600" />
              <ul className="mt-3.5">
                {cat.profile.specialties.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {cat.photos.length > 0 && (
          <div className="mt-10">
            <PhotosCarousel slides={cat.photos} />
          </div>
        )}
        {cat.profile?.biography && (
          <div
            className={clsx(
              'mx-auto flex max-h-fit max-w-2xl rounded-lg bg-white p-4 shadow-lg ring-1 ring-inset ring-gray-600/15',
              'dark:bg-slate-700/75 dark:ring-gray-50/15'
            )}
          >
            {cat.profile.biography}
          </div>
        )}
      </div>
    </div>
  )
}
