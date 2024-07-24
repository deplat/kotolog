import prisma from "@/lib/db/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import {getAge} from "@/lib/helpers";

export const revalidate = 5

async function getCatWithProfile(id: number) {
    return prisma.cat.findUnique({where: {id}, include: {avatar: true, profile: true}});
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
                    <div className="group md:col-span-2">
                        <div className="relative aspect-h-1 aspect-w-1 w-full rounded overflow-hidden">
                            <Image
                                src={cat.avatar?.url || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main"}
                                alt={cat.name}
                                fill
                            />
                        </div>
                        <div className="text-center mt-2.5">
                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                {cat.name}
                            </h3>
                            <p className="mt-1 text-lg lg:text-xl text-gray-500">{cat.birth ? getAge(cat.birth) : '\u00A0'}</p>
                        </div>
                    </div>
                <div className="bg-orange-100 col-span-2 md:col-span-4 p-2 lg:p-5">
                    <ul className="columns-2 gap-5 font-medium text-gray-900">
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
                <div className="col-span-2 lg:col-span-1">
                    <div className="grid grid-rows-2 gap-y-3">
                        <button className="bg-orange-300 py-2 px-4 rounded">Придти в гости</button>
                        <button className="bg-orange-300 py-2 px-4 rounded">Забрать домой</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
