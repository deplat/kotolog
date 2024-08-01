import {Prisma} from "@prisma/client";
import prisma from "@/lib/prisma";

export interface PetFormData {
    petType: 'CAT' | 'DOG';
    name: string;
    slug: string;
    birthDate: Date | null;
    gender: 'MALE' | 'FEMALE';
    furType?: 'SHORT' | 'MEDIUM' | 'LONG' | 'HAIRLESS';
    colors: number[]
    isUnclaimed: boolean;
    isFeatured: boolean;
    isAvailable: boolean;
    isAdopted: boolean;
    isVisible: boolean;
    avatar?: string;
    photos?: string[];
}

export interface PetProfileFormData {
    petId: number;
    socialized: boolean;
    friendlyWithCats: boolean;
    friendlyWithDogs: boolean;
    friendlyWithAnimals: boolean;
    litterBoxTrained?: boolean;
    usesScratchingPost?: boolean;
    sterilized: boolean;
    vaccinated: boolean;
    treatedForParasites: boolean;
    healthStatus:
        'HEALTHY' |
        'UNDER_TREATMENT' |
        'RECOVERING' |
        'CHRONIC_CONDITION' |
        'UNKNOWN';
    healthNotes: string[];
    specialties: string[];
    biography?: string;
}