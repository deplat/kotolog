'use server'

import { Prisma, UserProfileRole } from '@prisma/client'
import { prismaErrorHandler } from '@/utils/error-handler'
import { logAction } from '@/utils/logging'
import { CreateProfileInput, UpdateProfileInput } from '@/types/profile'
import { auth } from '@/auth'
import { validateUserProfileRole } from '@/utils/validateUserProfileRole'
import { errorResponse, successResponse } from '@/utils/response'
import { prisma } from '@/prisma/prisma'
import { revalidateTag } from 'next/cache'

export async function createProfile({
  name,
  description,
  phone,
  address,
  website,
  owner,
  type,
}: CreateProfileInput) {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an profiles')
  }
  const createProfileInput = Prisma.validator<Prisma.ProfileCreateInput>()({
    name,
    description,
    phone,
    address,
    website,
    owner,
    type,
    roles: {
      create: {
        user: {
          connect: {
            id: user.id,
          },
        },
        role: UserProfileRole.PROFILE_OWNER,
      },
    },
  })
  try {
    const newProfile = await prisma.profile.create({
      data: createProfileInput,
      select: {
        id: true,
        name: true,
        description: true,
        phone: true,
        address: true,
        website: true,
        owner: true,
        type: true,
      },
    })
    if (!newProfile) {
      await logAction({
        userId,
        action: 'CREATE_PROFILE_ERROR',
        metadata: {
          input: {
            name: createProfileInput.name,
            description: createProfileInput.description,
            phone: createProfileInput.phone,
            address: createProfileInput.address,
            website: createProfileInput.website,
            owner: createProfileInput.owner,
            type: createProfileInput.type,
          },
        },
      })
      return errorResponse('Failed to create profiles')
    }
    await logAction({
      userId,
      action: 'CREATE_PROFILE',
      metadata: {
        name: createProfileInput.name,
        description: createProfileInput.description,
        phone: createProfileInput.phone,
        address: createProfileInput.address,
        website: createProfileInput.website,
        owner: createProfileInput.owner,
        type: createProfileInput.type,
      },
    })
    revalidateTag('profiles')
    return successResponse('Profile created successfully', newProfile)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    await logAction({
      userId,
      action: 'CREATE_PROFILE_ERROR',
      metadata: { error: parsedError.message },
    })
    return errorResponse(parsedError.message)
  }
}

export async function updateProfile({
  id,
  name,
  description,
  phone,
  address,
  website,
  type,
  owner,
  status,
  archivedReason,
}: UpdateProfileInput) {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to update an profiles')
  }
  const hasPermissions = await validateUserProfileRole(userId, id, [
    UserProfileRole.PROFILE_OWNER,
    UserProfileRole.PROFILE_ADMIN,
  ])
  if (!hasPermissions) {
    await logAction({
      userId,
      profileId: id,
      action: 'UPDATE_PROFILE_ERROR',
      metadata: { message: 'User does not have permission to update this profiles' },
    })
    return errorResponse('You do not have permission to update this profiles')
  }

  try {
    const updateProfileInput = Prisma.validator<Prisma.ProfileUpdateInput>()({
      name,
      description,
      phone,
      address,
      website,
      type,
      owner,
      status,
      archivedReason,
      archivedAt: status == 'ARCHIVED' ? new Date() : undefined,
    })

    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: updateProfileInput,
    })

    await logAction({
      userId,
      profileId: id,
      action: 'UPDATE_PROFILE',
      metadata: {
        name: updateProfileInput.name,
        description: updateProfileInput.description,
        phone: updateProfileInput.phone,
        address: updateProfileInput.address,
        website: updateProfileInput.website,
        type: updateProfileInput.type,
        owner: updateProfileInput.owner,
        status: updateProfileInput.status,
        archivedReason: updateProfileInput.archivedReason,
      },
    })
    return successResponse('Profile updated successfully', updatedProfile)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)

    await logAction({
      userId,
      profileId: id,
      action: 'UPDATE_ENTITY_ERROR',
      metadata: { error: parsedError.message },
    })
    return errorResponse(parsedError.message)
  }
}
