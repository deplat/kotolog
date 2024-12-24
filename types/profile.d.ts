import { ProfileType, Status } from '@prisma/client'
import { WishData } from '@/types/wish'

export interface ProfileData {
  id?: string
  name?: string
  nickName?: string
  description?: string
  phone?: string
  address?: string
  website?: string
  owner?: string
  type?: ProfileType
  status?: Status
  createdAt?: Date
  updatedAt?: Date
  archivedAt?: Date
  archivedReason?: string
  wishes?: WishData[]
}

export interface CreateProfileInput {
  name: string
  nickName: string
  description: string
  phone: string
  address: string
  website?: string
  owner: string
  type: ProfileType
}

export interface UpdateProfileInput {
  id: string
  nickName?: string
  name?: string
  description?: string
  phone?: string
  address?: string
  website?: string
  type?: ProfileType
  owner?: string
  status: Status
  archivedReason?: string
}
