import { Pet } from '../../../_data-access'
import { Color } from '@/types'

export const getDefaultValues = (pet: Pet | null) => {
  return pet
    ? {
        id: pet.id,
        name: pet.name,
        slug: pet.slug,
        birthDate: pet.birthDate,
        gender: pet.gender,
        petType: pet.petType,
        furType: pet.furType,
        isUnclaimed: pet.isUnclaimed,
        isFeatured: pet.isFeatured,
        isAvailable: pet.isAvailable,
        isAdopted: pet.isAdopted,
        isVisible: pet.isVisible,
        socialized: pet.profile?.socialized,
        friendlyWithCats: pet.profile?.friendlyWithCats,
        friendlyWithDogs: pet.profile?.friendlyWithDogs,
        friendlyWithAnimals: pet.profile?.friendlyWithAnimals,
        litterBoxTrained: pet.profile?.litterBoxTrained,
        usesScratchingPost: pet.profile?.usesScratchingPost,
        sterilized: pet.profile?.sterilized,
        vaccinated: pet.profile?.vaccinated,
        treatedForParasites: pet.profile?.treatedForParasites,
        healthStatus: pet.profile?.healthStatus,
        healthNotes: pet.profile?.healthNotes,
        specialties: pet.profile?.specialties,
        biography: pet.profile?.biography,
        colors: pet.colors?.map((color: Color) => color.id),
        avatar: pet.avatar,
        photos: pet.photos,
      }
    : {
        birthDate: null,
        gender: 'MALE',
        petType: 'CAT',
        furType: null,
        isUnclaimed: false,
        isFeatured: false,
        isAvailable: true,
        isAdopted: false,
        isVisible: false,
        socialized: true,
        friendlyWithCats: true,
        friendlyWithDogs: false,
        friendlyWithAnimals: false,
        healthStatus: 'UNKNOWN',
        healthNotes: [],
        specialties: [],
        sterilized: true,
        vaccinated: true,
        treatedForParasites: true,
        biography: null,
        colors: [],
        avatar: null,
        photos: [],
      }
}
