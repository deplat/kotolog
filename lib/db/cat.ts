import {Prisma} from '@prisma/client';
import {CatCreateBaseInput, CatCreateProfileInput} from '@/types';
import prisma from "@/lib/db/prisma";
import sharp from "sharp";



export const catCreateBase = async (data: CatCreateBaseInput) => {
    try {
        const catBase = (data: CatCreateBaseInput) => {
            return Prisma.validator<Prisma.CatCreateInput>()({
                name: data.name,
                birth: data.birth,
                sex: data.sex,
                fur: data.fur,
                colors: {
                    connect: data.colors.map((id) => ({id})),
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

interface AlbumPhotoWithDimensions {
    url: string;
    width: number;
    height: number;
}

export const catCreateProfile = async (data: CatCreateProfileInput) => {
    try {
        let albumWithDimensions: Awaited<AlbumPhotoWithDimensions | null>[] = [];
        if (data.album) {
            albumWithDimensions = await Promise.all(
                data.album.map(async (url): Promise<AlbumPhotoWithDimensions | null> => {
                    try {
                        const response = await fetch(url);
                        const buffer = await response.arrayBuffer();
                        const { width, height } = await sharp(Buffer.from(buffer)).metadata();
                        if (width && height) {
                            return { url, width, height };
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

       const cleanedAlbumWithDimensions = albumWithDimensions.filter((item): item is AlbumPhotoWithDimensions => item !== null);


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
                                            data: cleanedAlbumWithDimensions.map((photo) => ({
                                                url: photo.url,
                                                width: photo.width,
                                                height: photo.height,
                                            })),
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