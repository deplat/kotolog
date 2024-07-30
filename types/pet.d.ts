export interface PetFormData {
    type: 'CAT' | 'DOG';
    name: string;
    slug: string;
    birth: Date | null;
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