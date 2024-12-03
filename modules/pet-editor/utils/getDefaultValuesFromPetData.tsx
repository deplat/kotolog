import { PetData } from '@/types/pet'
import { FurType } from '@prisma/client'

export const getDefaultValuesFromPetData = (
  pet: PetData | null,
  profile: { nickName: string }
): PetData => {
  return pet
    ? pet
    : {
        gender: 'MALE',
        type: 'CAT',
        furType: FurType.SHORT,
        isReadyForAdoption: true,
        isFeatured: false,
        isAdopted: false,
        isPublished: false,
        profile: profile,
        petProfile: {
          isSocialized: true,
          isFriendlyWithCats: true,
          isFriendlyWithDogs: false,
          isFriendlyWithOtherAnimals: false,
          isLitterBoxTrained: undefined,
          isUsesScratchingPost: undefined,
          isSterilized: true,
          isVaccinated: true,
          isTreatedForParasites: true,
          healthStatus: 'UNKNOWN',
          biography: '',
        },
        colors: [],
      }
}
