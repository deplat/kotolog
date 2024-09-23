
export interface ImageWithDimensions {
  id?: number
  src: string
  width: number
  height: number
}

export interface Color {
  id: number
  name: string
}

export interface HealthNote {
  id: number
  description: string
}
export interface Specialty {
  id: number
  description: string
}

export interface PetData {
  id: number | null
  name: string
  slug: string
  birthDate: Date | null
  gender: 'MALE' | 'FEMALE' | null
  petType: 'CAT' | 'DOG'
  furType: null | 'SHORT' | 'MEDIUM' | 'LONG' | 'HAIRLESS'
  isUnclaimed: boolean
  isFeatured: boolean
  isAvailable: boolean
  isAdopted: boolean
  isVisible: boolean
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
  healthNotes: HealthNote[]
  specialties: Specialty[]
  biography: string | null
  colors: number[]
  avatar: ImageWithDimensions | null
  photos: ImageWithDimensions[]
}
