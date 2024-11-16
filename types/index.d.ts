export interface Filter {
  key: string
  label: string
  value: string | string[] | number
}

export interface ImageWithDimensions {
  id?: number
  src: string
  width: number
  height: number
}

export interface ImageFileWithDimensions {
  file: File
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
  gender: $Enums.Gender | null
  petType: $Enums.PetType
  furType: $Enums.FurType | null
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
  healthStatus: $Enums.HealthStatus
  healthNotes: HealthNote[]
  specialties: Specialty[]
  biography: string | null
  colors: number[]
  avatar: ImageWithDimensions | null
  photos: ImageWithDimensions[]
}
