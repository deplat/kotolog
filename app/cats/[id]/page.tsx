import prisma from "@/lib/db/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import LightBox from "./LightBox";

export const revalidate = 5

async function getPetWithProfile(id: number) {
    return prisma.pet.findUnique({
        where: {id},
        include: {
            avatar: true,
            photos: true,
            profile: {
                include: {
                    healthNotes: true,
                    specialties: true,
                }
            }
        }
    });
}

export default async function CatPage({params}: { params: { id: string } }) {
    const cat = await getPetWithProfile(Number(params.id))
    if (!cat) {
        return <NotFound/>
    }

    const wordEnd = () => {
        return cat.gender === "FEMALE" && 'a'
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
                            src={cat.avatar?.src || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main"}
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
            <div className="container max-w-7xl mx-auto justify-center mt-80 mb-6 px-4">
                <div className="grid lg:grid-cols-4 gap-3  md:gap-6">
                    <div
                        className="col-span-2 p-4 overflow-x-auto border-2 rounded-md bg-white"
                        style={{borderColor: "#CBD2D9"}}
                    >
                        <ul className="columns-2 gap-x-6 font-medium text-gray-900">
                            {cat.profile?.socialized && (
                                <li className="mb-2">
                                    Социализирован{wordEnd()}
                                </li>
                            )}
                            {cat.profile?.friendlyWithCats && (
                                <li className="mb-2">
                                    Ладит с другими кошками
                                </li>
                            )}
                            {cat.profile?.friendlyWithDogs && (
                                <li className="mb-2">
                                    Ладит с собаками
                                </li>
                            )}
                            {cat.profile?.friendlyWithAnimals && (
                                <li className="mb-2">
                                    Не против других животных
                                </li>
                            )}
                            {cat.profile?.litterBoxTrained && (
                                <li className="mb-2">
                                    Приучен{wordEnd()} к лотку
                                </li>
                            )}
                            {cat.profile?.usesScratchingPost && (
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
                            {cat.profile?.treatedForParasites && (
                                <li>
                                    Обработан{wordEnd()} от паразитов
                                </li>
                            )}
                        </ul>
                    </div>
                    {(cat.profile?.healthNotes?.length && (
                        <div
                            className="p-4 border-2 rounded-md bg-white"
                            style={{borderColor: "#CBD2D9"}}
                        >
                            О здоровье:
                            <hr style={{border: "1px solid #F35627"}}/>
                            <ul className="mt-3.5">
                                {cat.profile.healthNotes.map((item, index) => (
                                    <li key={index}>{item.description}</li>
                                ))}
                            </ul>
                        </div>
                    ) || <></>)}
                    {cat.profile?.specialties.length && (
                        <div
                            className="p-4 border-2 rounded-md bg-white"
                            style={{borderColor: "#CBD2D9"}}
                        >
                            Что любит:
                            <hr style={{border: "1px solid #F35627"}}/>
                            <ul className="mt-3.5">
                                {cat.profile.specialties.map((item, index) => (
                                    <li key={index}>{item.description}</li>
                                ))}
                            </ul>
                        </div>
                    ) || <></>}
                </div>

            </div>

            <div className="container max-w-7xl mx-auto px-4 ">
                {cat.photos.length > 0 && <LightBox photos={cat.photos}/>}
                {cat.profile?.biography && (
                    <div className="flex justify-center max-h-fit mb-10 p-3 border-2 rounded-md bg-white"
                         style={{borderColor: "#CBD2D9"}}>
                        {cat.profile.biography}
                    </div>
                )}
            </div>

        </div>
    )
}


/*
  {cat.profile?.album && (
    <div className="flex justify-center my-10" style={{height: "700px"}}>
        <div className="flex overflow-x-auto overflow-y-hidden gap-x-4">
            {cat.profile.album.photos.map((photo, index) => (
                <Image key={index} src={photo.src} alt={cat.name} width={photo.width} height={photo.height}
                    className="h-full min-w-fit"/>
                     ))}
          </div>
    </div>
  )}
 */
