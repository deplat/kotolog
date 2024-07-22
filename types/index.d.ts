import { Prisma } from '@prisma/client';

export type CatCreateBaseInput = {
    name: string;
    birth?: Date;
    sex: 'MALE' | 'FEMALE';
    fur: 'SHORT' | 'LONG' | 'HAIRLESS';
    colors: number[];
    avatarUrl?: string;
    show: boolean;
    adopted: boolean;
};

export type CatCreateProfileInput = {
    catId: number;
    socialized: boolean;
    catFriendly: boolean;
    dogFriendly: boolean;
    animalFriendly: boolean;
    litterBox: boolean;
    scratchingPost: boolean;
    sterilized: boolean;
    vaccinated: boolean;
    paraTreated: boolean;
    healthStatus: 'HEALTHY' | 'UNDER_TREATMENT' | 'RECOVERING' | 'CHRONIC_CONDITION' | 'UNKNOWN';
    healthFeatures?: string[];
    specialties?: string[];
    bio?: string;
    album?: string[];
};

export type ColorCreateInput = {
    name: string;
};

export type CatWithAvatarAndProfileId = Prisma.CatGetPayload<{
    include: {
        avatar: true;
        profile: {
            select: {
                id: true;
            };
        };
    };
}>;

export type Color = Prisma.ColorGetPayload<{
    select: {
        id: true;
        name: true;
    };
}>;
