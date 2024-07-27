import prisma from "@/lib/db/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";

export const revalidate = 5

async function getCatWithProfile(id: number) {
    return prisma.cat.findUnique({
        where: {id}, include: {
            avatar: true, profile: {
                include: {
                    healthFeatures: true,
                    specialties: true,
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
        <div style={{backgroundColor: "#F5F7FA"}}>
            <div className="flex flex-col absolute top-32 w-screen gap-y-6 justify-center">
                <div
                    className="w-fit h-fit p-3 mx-auto border-2 rounded-md bg-white"
                    style={{borderColor: "#CBD2D9"}}
                >
                    <div
                        className="relative w-72 aspect-h-1 aspect-w-1 rounded-md overflow-hidden">
                        <Image
                            src={cat.avatar?.url || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main"}
                            alt={cat.name}
                            fill
                        />
                    </div>
                </div>
                <div className="text-center text-2xl font-medium">{cat.name}</div>
                <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 w-fit mx-auto">
                    <button className="btn secondary px-5 py-2 rounded-md">Придти в гости</button>
                    <button className="btn primary  px-5-2 rounded-md">Забрать домой</button>
                </div>
            </div>
            <div className="container max-w-7xl mx-auto mt-80 mb-6 px-4">
                <div className="grid lg:grid-cols-4 gap-3  md:gap-6">
                    <div
                        className="col-span-2 p-4 overflow-x-auto border-2 rounded-md bg-white"
                        style={{borderColor: "#CBD2D9"}}
                    >
                        <ul className="columns-2 gap-x-8 font-medium text-gray-900">
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
                    <div
                        className="p-4 border-2 rounded-md bg-white"
                        style={{borderColor: "#CBD2D9"}}
                    >
                        О здоровье:
                        <hr style={{border: "1px solid #F35627"}}/>
                        {cat.profile?.healthFeatures.length && (
                            <ul className="mt-3.5">
                                {cat.profile.healthFeatures.map((item, index) => (
                                    <li key={index}>{item.text}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div
                        className="p-4 border-2 rounded-md bg-white"
                        style={{borderColor: "#CBD2D9"}}
                    >
                        Что любит:
                        <hr style={{border: "1px solid #F35627"}}/>
                        {cat.profile?.specialties.length && (
                            <ul className="mt-3.5">
                                {cat.profile.specialties.map((item, index) => (
                                    <li key={index}>{item.text}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </div>

            {cat.profile?.album && (
                <div className="flex justify-center my-10" style={{height: "700px"}}>
                    <div className="flex overflow-x-auto overflow-y-hidden gap-x-4">
                        {cat.profile.album.photos.map((photo, index) => (
                            <Image key={index} src={photo.url} alt={cat.name} width={photo.width} height={photo.height}
                            className="h-full min-w-fit"/>
                        ))}
                    </div>
                </div>
            )}

            <div className="container max-w-7xl mx-auto px-4 ">
                {cat.profile?.bio && (
                    <div className="flex justify-center max-h-fit mb-10 p-3 border-2 rounded-md bg-white"
                         style={{borderColor: "#CBD2D9"}}>
                        {cat.profile.bio}
                    </div>
                )}
            </div>

        </div>
    )
}
