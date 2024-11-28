import { ProfileType, Status } from '@prisma/client'

export interface CreateProfileInput {
  name: string
  description: string
  phone: string
  address: string
  website?: string
  owner: string
  type: ProfileType
}

export interface UpdateProfileInput {
  id: string
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
