import {NextRequest, NextResponse} from "next/server";
import {del} from "@vercel/blob";
import prisma from "@/lib/db/prisma";

export async function DELETE(req: NextRequest, {params}: { params: { id: number } }) {
    const id = Number(params.id);

    try {
        const cat = await prisma.cat.findUnique({
            where: {id: id},
            include: {
                avatar: true,
                profile: {
                    include: {
                        album: {
                            include: {
                                photos: true
                            }
                        },
                        healthFeatures: true,
                        specialties: true
                    }
                }
            }
        });

        if (!cat) {
            return NextResponse.json({error: 'No cat with this ID'}, {status: 404});
        }

        if (cat.avatar) {
            await del(cat.avatar.url);
            await prisma.avatar.delete({
                where: {
                    id: cat.avatar.id
                }
            })
        }


        if (cat.profile) {

            if (cat.profile.healthFeatures) {
                await prisma.healthFeature.deleteMany({
                    where: {
                        profileId: cat.profile.id
                    }
                });
            }

            if (cat.profile.specialties) {
                await prisma.specialty.deleteMany({
                    where : {
                        profileId: cat.profile.id
                    }
                });
            }

            if (cat.profile.album) {
                const photos = cat.profile.album.photos
                await del(photos.map((photo) => photo.url));
                await prisma.photo.deleteMany({
                    where: {albumId: cat.profile.album.id}
                });
                await prisma.album.delete({
                    where: {id: cat.profile.album.id}
                });
            }

            await prisma.profile.delete({
                where: {id: cat.profile.id}
            });
        }

        await prisma.cat.delete({
            where: {id}
        });

        return NextResponse.json('Cat deleted successfully.');

    } catch (error) {
        console.error('Error deleting cat:', error);
        return NextResponse.json({ error:"Internal Server Error"},{status: 500});
    } finally {
        await prisma.$disconnect()
    }
}