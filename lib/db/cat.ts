import {Prisma} from '@prisma/client';
import {CatCreateBaseInput, CatCreateProfileInput} from '@/types';
import prisma from "@/lib/db/prisma";
import sharp from "sharp";

interface PhotoWithDimensions {
    src: string;
    width: number;
    height: number;
}

export const catCreateBase = async (data: CatCreateBaseInput) => {
    try {
        let avatarWithDimensions : PhotoWithDimensions | null;
        if (data.avatarUrl) {
            const src = data.avatarUrl;
            const response = await fetch(src);
            const buffer = await response.arrayBuffer();
            const {width, height} = await sharp(Buffer.from(buffer)).metadata();
            if (width && height) {
                avatarWithDimensions = {src, width, height};
            } else {
                console.error('Failed to get dimensions');
                return null
            }
        }


        const catBase = (data: CatCreateBaseInput) => {
            return Prisma.validator<Prisma.CatCreateInput>()({
                name: data.name,
                birth: data.birth,
                sex: data.sex,
                fur: data.fur,
                colors: {
                    connect: data.colors.map((id) => ({id})),
                },
                ...(avatarWithDimensions && {
                    avatar: {
                        create: avatarWithDimensions
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
                        src: true,
                        width: true,
                        height: true,
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
        let albumWithDimensions: Awaited<PhotoWithDimensions | null>[] = [];
        if (data.album) {
            albumWithDimensions = await Promise.all(
                data.album.map(async (src): Promise<PhotoWithDimensions | null> => {
                    try {
                        const response = await fetch(src);
                        const buffer = await response.arrayBuffer();
                        const {width, height} = await sharp(Buffer.from(buffer)).metadata();
                        if (width && height) {
                            return {src, width, height};
                        } else {
                            console.error('Failed to get dimensions');
                            return null
                        }
                    } catch (error) {
                        console.error('Error fetching image dimensions:', error);
                        return null;
                    }
                })
            );
        }

        const cleanedAlbumWithDimensions = albumWithDimensions.filter((item): item is PhotoWithDimensions => item !== null);


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
                                    data: data.healthFeatures.map((text) => ({text})),
                                },
                            },
                        }),
                        ...(data.specialties && {
                            specialties: {
                                createMany: {
                                    data: data.specialties.map((text) => ({text})),
                                },
                            },
                        }),
                        ...(cleanedAlbumWithDimensions.length && {
                            album: {
                                create: {
                                    photos: {
                                        createMany: {
                                            data: cleanedAlbumWithDimensions.map((photo) => (photo)),
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