import { FurType, HealthStatus, PetGender, PetType, Status } from '@prisma/client'

export interface PetData {
  id?: string
  name?: string
  nickName?: string
  birthDate?: Date
  type?: PetType
  gender?: PetGender
  furType?: FurType
  isReadyForAdoption?: boolean
  isFeatured?: boolean
  isAdopted?: boolean
  isPublished?: boolean
  status?: Status
  createdAt?: Date
  updatedAt?: Date
  archivedAt?: Date
  archivedReason?: string
  profile: {
    nickName: string
  }
  petProfile?: PetProfileData
  colors?: string[]
  photos?: PetImageData[]
}

export interface PetProfileData {
  petId?: string
  isSocialized?: boolean
  isFriendlyWithCats?: boolean
  isFriendlyWithDogs?: boolean
  isFriendlyWithOtherAnimals?: boolean
  isLitterBoxTrained?: boolean
  isUsesScratchingPost?: boolean
  isSterilized?: boolean
  isVaccinated?: boolean
  isTreatedForParasites?: boolean
  healthStatus?: HealthStatus
  biography?: string
}

export interface PetColorData {
  id: string
  name?: string
}

export interface ColorData {
  id: string
  name: string
}

export interface PetImageFileWithDimensions {
  file: File
  src: string
  width: number
  height: number
  isAvatar: boolean
  isPrimary: boolean
}

export interface PetImageData {
  id?: string
  petId?: string
  s3Key?: string
  src: string
  width: number
  height: number
  altText?: string
  isAvatar?: boolean
  isPrimary?: boolean
}

export interface PetImageCreateInputData {
  s3Key: string
  src: string
  width: number
  height: number
  altText?: string
  isAvatar: boolean
  isPrimary: boolean
}

export interface PetProfileInputData {
  petId?: string
  isSocialized: boolean
  isFriendlyWithCats: boolean
  isFriendlyWithDogs: boolean
  isFriendlyWithOtherAnimals: boolean
  isLitterBoxTrained?: boolean
  isUsesScratchingPost?: boolean
  isSterilized: boolean
  isVaccinated: boolean
  isTreatedForParasites: boolean
  healthStatus: HealthStatus
  biography: string
}

export interface PetProfileUpdateData {
  petId?: string
  isSocialized?: boolean
  isFriendlyWithCats?: boolean
  isFriendlyWithDogs?: boolean
  isFriendlyWithOtherAnimals?: boolean
  isLitterBoxTrained?: boolean
  isUsesScratchingPost?: boolean
  isSterilized?: boolean
  isVaccinated?: boolean
  isTreatedForParasites?: boolean
  healthStatus?: HealthStatus
  biography?: string
}

export interface PetCreateInputData {
  name: string
  nickName: string
  birthDate: Date
  type: PetType
  gender: PetGender
  furType: FurType
  isReadyForAdoption: boolean
  isFeatured: boolean
  isAdopted: boolean
  isPublished: boolean
  status: Status
  profile: {
    nickName: string
  }
  petProfile: PetProfileInputData
  colors: string[]
  photos: PetImageCreateInputData[]
}

export interface PetUpdateInputData {
  id: string
  name?: string
  nickName?: string
  birthDate?: Date
  type?: PetType
  gender?: PetGender
  furType?: FurType
  isReadyForAdoption?: boolean
  isFeatured?: boolean
  isAdopted?: boolean
  isPublished?: boolean
  status?: Status
  archivedReason?: string
  profile?: {
    nickName: string
  }
  petProfile: PetProfileUpdateData
  colors: string[]
  photos: PetImageCreateInputData[]
  deletedPhotosIds: string[]
}
