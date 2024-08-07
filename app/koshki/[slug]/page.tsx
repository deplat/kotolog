import prisma from "@/lib/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import LightBox from "./LightBox";
import {getAge} from "@/lib/helpers";
import ContactButton from "@/app/koshki/[slug]/ContactButton";

async function getPetWithProfile(slug: string) {
    return prisma.pet.findUnique({
        where: {slug},
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

export default async function CatPage({params}: { params: { slug: string } }) {

    const cat = await getPetWithProfile(params.slug)
    if (!cat) {
        return <NotFound/>
    }

    let catAge: string | undefined;
    let isFemale = cat.gender === 'FEMALE';

    if (cat.birthDate !== null) {
        catAge = getAge(cat.birthDate);
    }

    const wordEnd = () => (isFemale ? 'a' : '');

    return (
        <div style={{backgroundColor: "#F5F7FA"}}>
            <div className="flex flex-col relative bottom-40 w-screen gap-y-6 justify-center">
                <div className="w-fit h-fit p-3 mx-auto border-2 rounded-md bg-white" style={{borderColor: "#CBD2D9"}}>
                    <div className="relative w-72 aspect-h-1 aspect-w-1 rounded-md overflow-hidden">
                        <Image
                            src={cat.avatar?.src || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main"}
                            alt={cat.name}
                            fill
                        />
                    </div>
                </div>
                <div className="text-center text-2xl font-medium">Знакомьтесь — {cat.name}!</div>
                {(catAge && catAge !== '\u00A0')
                    &&
                    (<div className="text-center font-medium">{isFemale ? 'Eй' : 'Ему'} {catAge},
                            и {isFemale ? 'она' : 'он'}:</div>
                    )
                }
                <ul className="max-w-fit mx-auto px-4 font-medium text-gray-900 sm:columns-2">
                    {cat.profile?.socialized && (
                        <li className="mb-2">Социализирован{wordEnd()}</li>
                    )}
                    {cat.profile?.friendlyWithCats && (
                        <li className="mb-2">Ладит с другими кошками</li>
                    )}
                    {cat.profile?.friendlyWithDogs && (
                        <li className="mb-2">Ладит с собаками</li>
                    )}
                    {cat.profile?.friendlyWithAnimals && (
                        <li className="mb-2">Не против других животных</li>
                    )}
                    {cat.profile?.litterBoxTrained && (
                        <li className="mb-2">Приучен{wordEnd()} к лотку</li>
                    )}
                    {cat.profile?.usesScratchingPost && (
                        <li className="mb-2">Пользуется&nbsp;когтеточкой</li>
                    )}
                    {cat.profile?.sterilized && (
                        <li className="mb-2">Стерилизован{wordEnd()}</li>
                    )}
                    {cat.profile?.vaccinated && (
                        <li className="mb-2">Вакцинирован{wordEnd()}</li>
                    )}
                    {cat.profile?.treatedForParasites && (
                        <li>Обработан{wordEnd()} от паразитов</li>
                    )}
                </ul>
                <div className="flex justify-center">
                    <ContactButton/>
                </div>
                <div className="container max-w-7xl mx-auto justify-center p-4">
                    <div className='flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-6'>
                        {(cat.profile?.healthNotes && cat.profile.healthNotes.length > 0) && (
                            <div className="flex-1 p-4 border-2 rounded-md bg-white" style={{borderColor: "#CBD2D9"}}>
                                Про здоровье:
                                <hr style={{border: "1px solid #F35627"}}/>
                                <ul className="mt-3.5">
                                    {cat.profile.healthNotes.map((item, index) => (
                                        <li key={index}>{item.description}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {(cat.profile?.specialties && cat.profile.specialties.length > 0) && (
                            <div className="flex-1 p-4 border-2 rounded-md bg-white" style={{borderColor: "#CBD2D9"}}>
                                Характер и привычки:
                                <hr style={{border: "1px solid #F35627"}}/>
                                <ul className="mt-3.5">
                                    {cat.profile.specialties.map((item, index) => (
                                        <li key={index}>{item.description}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {cat.photos.length > 0 && <LightBox photos={cat.photos}/>}
                    {cat.profile?.biography && (
                        <div className="flex justify-center max-h-fit mb-10 p-4 border-2 rounded-md bg-white"
                             style={{borderColor: "#CBD2D9"}}>
                            {cat.profile.biography}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
