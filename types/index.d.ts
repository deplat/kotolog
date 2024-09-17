export interface ImageWithDimensions {
  src: string
  width: number
  height: number
}

export interface ColorCreateInput {
  name: string
}

export interface PetFormData {
  id?: number
  petType: 'CAT' | 'DOG'
  name: string
  slug: string
  birthDate: Date | null
  gender: 'MALE' | 'FEMALE'
  furType: null | 'SHORT' | 'MEDIUM' | 'LONG' | 'HAIRLESS'
  colors: number[]
  isUnclaimed: boolean
  isFeatured: boolean
  isAvailable: boolean
  isAdopted: boolean
  isVisible: boolean
  avatar: ImageWithDimensions | null
  photos: string[]
  biography: string | null
  socialized: boolean
  friendlyWithCats: boolean
  friendlyWithDogs: boolean
  friendlyWithAnimals: boolean
  litterBoxTrained: boolean | null
  usesScratchingPost: boolean | null
  sterilized: boolean
  vaccinated: boolean
  treatedForParasites: boolean
  healthStatus: 'HEALTHY' | 'UNDER_TREATMENT' | 'RECOVERING' | 'CHRONIC_CONDITION' | 'UNKNOWN'
}
