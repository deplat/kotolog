import prisma from "@/lib/db/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";

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
        <div>
            <div
                className="flex justify-center w-screen h-72 border-t-4 border-b-2 bg-white"
                style={{borderColor: "#CBD2D9", borderTopColor: "#F35627"}}
            >
                <div
                    className="group relative top-28 w-72 h-fit p-3 border-2 rounded-md bg-white"
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
                    <div className="text-center mt-4 mb-1">
                        <h3
                            className="text-lg font-semibold"
                            style={{color: "#1F2933"}}
                        >
                            {cat.name}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="container relative top-60 max-w-7xl mx-auto p-3 md:p-8">

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 gap-y-4 md:gap-4">
                    <div
                        className="col-span-2 md:col-span-4 p-3 pe-0 border-2 rounded-md bg-white"
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
                    <div className="flex max-w-fit justify-center h-56 p-3 mt-4 border-2 rounded-md bg-white"
                         style={{borderColor: "#CBD2D9"}}>
                        <div className="flex overflow-x-auto overflow-y-hidden justify-center gap-x-3">
                            {cat.profile.album.photos.map((photo) => (
                                <Image key={photo.id} src={photo.url} alt={cat.name} width={photo.width}
                                       height={photo.height} className="h-full w-auto"/>
                            ))}
                        </div>
                    </div>
                )}
                {cat.profile?.bio && (
                    <div className="flex justify-center max-h-fit p-3 mt-4 border-2 rounded-md bg-white"
                         style={{borderColor: "#CBD2D9"}}>
                        {cat.profile.bio}
                    </div>
                )}
            </div>
        </div>
    )
}
