import {PetFormData, PetProfileFormData} from "@/types/pet";
import sharp, {Color} from "sharp";
import {Prisma} from "@prisma/client";
import prisma from "@/lib/prisma";
import {PhotoWithDimensions} from "@/types";

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

export const catSelectForDashboard = Prisma.validator<Prisma.PetSelect>()({
    id: true,
    slug: true,
    name: true,
    birthDate: true,
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
});

export const getCatsForDashboard = async () => {
    return prisma.pet.findMany({
        where: {
            petType: 'CAT',
        },
        select: catSelectForDashboard,
        orderBy: {
            id: 'desc',
        },
    });
}

export type CatsForDashboard = Prisma.PromiseReturnType<typeof getCatsForDashboard>

export const colorSelectForDashboard = Prisma.validator<Prisma.ColorSelect>()({
    id: true,
    name: true,
})

export const getColorsForDashboard = async ()=> {
    return prisma.color.findMany({
        select: colorSelectForDashboard
    })
}

export type ColorsForDashboard = Prisma.PromiseReturnType<typeof getColorsForDashboard>
