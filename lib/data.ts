import {PetFormData, PetProfileFormData} from "@/types/pet";
import sharp from "sharp";
import {Prisma} from "@prisma/client";
import prisma from "@/lib/prisma";
import {PhotoWithDimensions} from "@/types";
import {unstable_cache} from "next/cache";

export const createPet = async (data: PetFormData) => {
    try {
        let avatarWithDimensions: PhotoWithDimensions | null = null;
        let photosWithDimensions: PhotoWithDimensions[] = [];

        if (data.avatar) {
            const src = data.avatar;
            const response = await fetch(src);
            const buffer = await response.arrayBuffer();
            const {width, height} = await sharp(Buffer.from(buffer)).metadata();
            if (width && height) {
                avatarWithDimensions = {src, width, height};
            } else {
                console.error('Failed to get dimensions for avatar');
                return null;
            }
        }

        if (data.photos) {
            photosWithDimensions = await Promise.all(
                data.photos.map(async (src): Promise<PhotoWithDimensions | null> => {
                    try {
                        const response = await fetch(src);
                        const buffer = await response.arrayBuffer();
                        const {width, height} = await sharp(Buffer.from(buffer)).metadata();
                        if (width && height) {
                            return {src, width, height};
                        } else {
                            console.error('Failed to get dimensions for photo');
                            return null;
                        }
                    } catch (error) {
                        console.error('Error fetching images dimensions:', error);
                        return null;
                    }
                })
            ).then(results => results.filter((item): item is PhotoWithDimensions => item !== null));
        }

        const petData: Prisma.PetCreateInput = {
            petType: data.petType,
            name: data.name,
            slug: data.slug,
            birthDate: data.birthDate,
            gender: data.gender,
            ...(data.furType && {furType: data.furType}),
            ...(data.colors.length > 0 && {
                colors: {
                    connect: data.colors.map((id) => ({id})),
                },
            }),
            ...(avatarWithDimensions && {
                avatar: {
                    create: avatarWithDimensions,
                },
            }),
            ...(photosWithDimensions.length > 0 && {
                photos: {
                    createMany: {
                        data: photosWithDimensions,
                    },
                },
            }),
            isUnclaimed: data.isUnclaimed,
            isFeatured: data.isFeatured,
            isAvailable: data.isAvailable,
            isAdopted: data.isAdopted,
            isVisible: data.isVisible,
        };

        return await prisma.pet.create({
            data: petData,
            include: {
                avatar: {
                    select: {
                        src: true,
                        width: true,
                        height: true,
                    },
                },
                colors: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
};

export const createPetProfile = async (data: PetProfileFormData) => {
    try {
        const petProfile: Prisma.PetUpdateInput = {
            profile: {
                create: {
                    socialized: data.socialized,
                    friendlyWithCats: data.friendlyWithCats,
                    friendlyWithDogs: data.friendlyWithDogs,
                    friendlyWithAnimals: data.friendlyWithAnimals,
                    litterBoxTrained: data.litterBoxTrained,
                    usesScratchingPost: data.usesScratchingPost,
                    sterilized: data.sterilized,
                    vaccinated: data.vaccinated,
                    treatedForParasites: data.treatedForParasites,
                    healthStatus: data.healthStatus,
                    biography: data.biography,
                    ...(data.healthNotes.length > 0 && {
                        healthNotes: {
                            createMany: {
                                data: data.healthNotes.map((description) => ({description})),
                            },
                        },
                    }),
                    ...(data.specialties.length > 0 && {
                        specialties: {
                            createMany: {
                                data: data.specialties.map((description) => ({description})),
                            },
                        },
                    }),

                },
            },
        };
        return await prisma.pet.update({
            where: {
                id: data.petId,
            },
            data: petProfile,
        });
    } catch (error) {
        console.error('Error creating pet profile:', error);
        throw error;
    }
};

export const catSelect = Prisma.validator<Prisma.PetSelect>()({
    id: true,
    slug: true,
    name: true,
    gender: true,
    birthDate: true,
    furType: true,
    avatar: {
        select: {
            src: true,
            width: true,
            height: true,
        }
    },
    profile: {
        select: {
            id: true,
        },
    },
    colors: {
        select: {
            id: true,
            name: true
        }
    },
});

export const getCats = async () => {
    return prisma.pet.findMany({
        where: {
            petType: 'CAT',
        },
        select: catSelect,
        orderBy: {
            id: 'desc',
        },
    });
}

export type Cats = Prisma.PromiseReturnType<typeof getCats>

export const colorSelect = Prisma.validator<Prisma.ColorSelect>()({
    id: true,
    name: true,
})

export const getColors = async ()=> {
    return prisma.color.findMany({
        select: colorSelect
    })
}

export type Colors = Prisma.PromiseReturnType<typeof getColors>

export const getCachedColors = unstable_cache(
    async () => getColors(),
    ['colors'],
    {
        tags: ['colors']
    }
);

export const getCachedCats = unstable_cache(
    async () => getCats(),
    ['cats'],
    {
        tags: ['cats']
    }
);

export const getListOfUniqueColorsFromCats = async () => {
    const uniqueColors : Colors = await prisma.$queryRaw`SELECT DISTINCT name FROM "Color" WHERE id IN (SELECT "A" FROM "_PetColors")`;
    return uniqueColors.map((color: { name: string }) => color.name);
}

export const getCachedListOfUniqueColorsFromCats = unstable_cache(
    async () => getListOfUniqueColorsFromCats(),
    ['unique_colors_from_cats'],
    {
        tags: ['unique_colors_from_cats'],
    }
)
