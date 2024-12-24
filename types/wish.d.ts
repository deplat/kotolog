import { WishImageData, WishImageCreateData } from '@/types/image'
import { ProfileData } from '@/types/profile'

export interface WishData {
  id?: string
  name?: string
  description?: string
  links?: string[]
  images?: WishImageData[]
  profileId?: string
  ar
  createdAt?: Date
  updatedAt?: Date
}

export interface WishCreateData extends WishData {
  name: string
  description: string
  links: string[]
  images: WishImageCreateData[]
  profileId: string
}

export interface WishUpdateData extends WishData {
  id: string
  name?: string
  description?: string
  links?: string[]
  images?: WishImageUpdateData[]
}

export interface WishDeleteData {
  id: string
}
