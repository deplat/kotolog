import prisma from "@/lib/db/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import {getAge} from "@/lib/helpers";

export const revalidate = 5

async function getCatWithProfile(id: number) {
    return prisma.cat.findUnique({
        where: {id}, include: {
            avatar: true, profile: {
                include: {
                    album: {
                        include: {
                            photos: true
                        }
                    }
                }
            }
        }
    });
}

export default async function CatPage({params}: { params: { id: string } }) {
    const cat = await getCatWithProfile(Number(params.id))
    if (!cat) {
        return <NotFound/>
    }

    const wordEnd = () => {
        return cat.sex === "FEMALE" && 'a'
    }

    return (
        <div className="xl:container lg:mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 gap-y-4 md:gap-4">
                <div
                    className="group md:col-span-2 p-4 pb-0 border-2 rounded-md bg-white"
                    style={{borderColor: "#CBD2D9"}}
                >
                    <div
                        className="relative aspect-h-1 aspect-w-1 w-full rounded-md overflow-hidden">
                        <Image
                            src={cat.avatar?.url || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main"}
                            alt={cat.name}
                            fill
                        />
                    </div>
                    <div className="text-center my-4">
                        <h3
                            className="text-xl lg:text-2xl font-semibold"
                            style={{color: "#1F2933"}}
                        >
                            {cat.name}
                        </h3>
                        <p
                            className="mt-1 text-lg lg:text-xl"
                            style={{color: "#616E7C"}}
                        >
                            {cat.birth ? getAge(cat.birth) : '\u00A0'}
                        </p>
                    </div>
                </div>
                <div
                    className="col-span-2 md:col-span-4 p-2 pe-0 lg:p-5 border-2 rounded-md bg-white"
                    style={{borderColor: "#CBD2D9"}}
                >
                    <ul className="columns-2
                     font-medium text-gray-900">
                        {cat.profile?.socialized && (
                            <li className="mb-2">
                                Социализирован{wordEnd()}
                            </li>
                        )}
                        {cat.profile?.catFriendly && (
                            <li className="mb-2">
                                Ладит с другими кошками
                            </li>
                        )}
                        {cat.profile?.dogFriendly && (
                            <li className="mb-2">
                                Ладит с собаками
                            </li>
                        )}
                        {cat.profile?.animalFriendly && (
                            <li className="mb-2">
                                Не против других животных
                            </li>
                        )}
                        {cat.profile?.litterBox && (
                            <li className="mb-2">
                                Приучен{wordEnd()} к лотку
                            </li>
                        )}
                        {cat.profile?.scratchingPost && (
                            <li className="mb-2">
                                Пользуется&nbsp;когтеточкой
                            </li>
                        )}
                        {cat.profile?.sterilized && (
                            <li className="mb-2">

                                Стерилизован{wordEnd()}
                            </li>
                        )}
                        {cat.profile?.vaccinated && (
                            <li className="mb-2">
                                Вакцинирован{wordEnd()}
                            </li>
                        )}
                        {cat.profile?.paraTreated && (
                            <li>
                                Обработан{wordEnd()} от паразитов
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {cat.profile?.album && (
                <div className="gallery-hor">
                    <div className="flex overflow-x-auto overflow-y-hidden gap-x-4">
                        {cat.profile.album.photos.map((photo) => (
                            <div  key={photo.id}  className="relative">
                                <Image src={photo.url} alt={cat.name} width={photo.width} height={photo.height} />
                            </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
};
