import { PrismaClient, Prisma } from '@prisma/client';
import { CatCreateBaseInput, CatCreateProfileInput } from '@/types';

const prisma = new PrismaClient();

export const catCreateBase = async (data: CatCreateBaseInput) => {
    try {
        const catBase = (data: CatCreateBaseInput) => {
            return Prisma.validator<Prisma.CatCreateInput>()({
                name: data.name,
                birth: data.birth,
                sex: data.sex,
                fur: data.fur,
                colors: {
                    connect: data.colors.map((id) => ({ id })),
                },
                ...(data.avatarUrl && {
                    avatar: {
                        create: {
                            url: data.avatarUrl,
                        },
                    },
                }),
                unclaimed: data.unclaimed,
                show: data.show,
                adopted: data.adopted,
            });
        };
        return await prisma.cat.create({
            data: catBase(data),
            include: {
                avatar: {
                    select: {
                        url: true,
                    }
                },
                colors: {
                    select: {
                        id: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating cat:', error);
        throw error;
    }
};

export const catCreateProfile = async (data: CatCreateProfileInput) => {
    try {
        const catProfile = (data: CatCreateProfileInput) => {
            return Prisma.validator<Prisma.CatUpdateInput>()({
                profile: {
                    create: {
                        socialized: data.socialized,
                        catFriendly: data.catFriendly,
                        dogFriendly: data.dogFriendly,
                        animalFriendly: data.animalFriendly,
                        litterBox: data.litterBox,
                        scratchingPost: data.scratchingPost,
                        sterilized: data.sterilized,
                        vaccinated: data.vaccinated,
                        paraTreated: data.paraTreated,
                        healthStatus: data.healthStatus,
                        bio: data.bio,
                        ...(data.healthFeatures && {
                            healthFeatures: {
                                createMany: {
                                    data: data.healthFeatures.map((text) => ({ text })),
                                },
                            },
                        }),
                        ...(data.specialties && {
                            specialties: {
                                createMany: {
                                    data: data.specialties.map((text) => ({ text })),
                                },
                            },
                        }),
                        ...(data.album && {
                            album: {
                                create: {
                                    photos: {
                                        createMany: {
                                            data: data.album.map((url) => ({ url })),
                                        },
                                    },
                                },
                            },
                        }),
                    },
                },
            });
        };
        return await prisma.cat.update({
            where: {
                id: data.catId,
            },
            data: catProfile(data),
        });
    } catch (error) {
        console.error('Error creating cat profile:', error);
    }
};