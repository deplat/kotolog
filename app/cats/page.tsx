import Image from "next/image";
import {getAge} from "@/lib/helpers";
import prisma from "@/lib/db/prisma";

export async function getCats() {
    return  prisma.cat.findMany({
        include: {
            avatar: {
                select: {
                    url: true
                }
            },
            profile: {
                select: {
                    id: true
                }
            }
        }
    }) // will be passed to the page component as props
}

export default async function Cats() {
    const cats = await getCats()
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">кошки</h2>
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                    {cats.map((cat) => (
                        <div key={cat.id} className="group relative">
                            <div
                                className="relative aspect-h-1 aspect-w-1 w-full rounded overflow-hidden">
                                <Image
                                    src={cat.avatar?.url || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/avatar/michelle-brittain-A62zcEohwFk-D1Ln4qiNlnCNKz3DkBGhgEaFxc9i63.jpg"}
                                    alt={cat.name}
                                    fill
                                />
                            </div>
                            <div className="text-center mt-2.5">
                                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                    <a href={`/cats/${cat.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        {cat.name}
                                    </a>
                                </h3>
                                <p className="mt-1 text-lg lg:text-xl text-gray-500">{cat.birth ? getAge(cat.birth) : '\u00A0'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}