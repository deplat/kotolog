'use server'

import { prismaErrorHandler } from '@/utils/error-handler'
import { Prisma, UserProfileRole } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import { prisma } from '@/prisma/prisma'
import { PetCreateInputData, PetUpdateInputData } from '@/types/pet'
import { auth } from '@/auth'
import { errorResponse, successResponse } from '@/utils/response'
import { logAction } from '@/utils/logging'
import { validateUserProfileRole } from '@/utils/validateUserProfileRole'

const prismaPetIncludeBase = Prisma.validator<Prisma.PetInclude>()({
  photos: {
    where: {
      isPrimary: true,
    },
    select: {
      src: true,
    },
  },
  colors: true,
})

const prismaPetIncludeFull = Prisma.validator<Prisma.PetInclude>()({
  photos: true,
  colors: true,
  petProfile: true,
  profile: true,
})

export const createPet = async ({
  name,
  nickName,
  birthDate,
  type,
  gender,
  furType,
  isReadyForAdoption,
  isFeatured,
  isAdopted,
  isPublished,
  petProfile,
  profile,
  colors,
  photos,
}: PetCreateInputData) => {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an pet')
  }
  const profileId = (await prisma.profile.findUnique({ where: { nickName: profile.nickName } }))?.id
  if (!profileId) return errorResponse('No profile found with this nickName')
  const hasPermissions = await validateUserProfileRole(userId, profileId, [
    UserProfileRole.PROFILE_OWNER,
    UserProfileRole.PROFILE_ADMIN,
    UserProfileRole.PROFILE_MANAGER,
  ])
  if (!hasPermissions) {
    await logAction({
      userId,
      profileId: profileId,
      action: 'CREATE_PET_ERROR',
      metadata: {
        error: 'User does not have permission to create pet for selected profiles',
      },
    })
    return errorResponse('You do not have permission to create pet for selected profiles')
  }

  const prismaPetCreateInput = Prisma.validator<Prisma.PetCreateInput>()({
    name,
    nickName,
    birthDate,
    type,
    gender,
    furType,
    isReadyForAdoption,
    isFeatured,
    isAdopted,
    isPublished,
    petProfile: petProfile
      ? {
          create: {
            isSocialized: petProfile?.isSocialized,
            isFriendlyWithCats: petProfile?.isFriendlyWithCats,
            isFriendlyWithDogs: petProfile?.isFriendlyWithDogs,
            isFriendlyWithOtherAnimals: petProfile?.isFriendlyWithOtherAnimals,
            isLitterBoxTrained: petProfile?.isLitterBoxTrained,
            isUsesScratchingPost: petProfile?.isUsesScratchingPost,
            isSterilized: petProfile?.isSterilized,
            isVaccinated: petProfile?.isVaccinated,
            isTreatedForParasites: petProfile?.isTreatedForParasites,
            healthStatus: petProfile?.healthStatus,
            biography: petProfile?.biography,
          },
        }
      : undefined,
    profile: {
      connect: {
        id: profileId,
      },
    },
    colors: {
      createMany: {
        data:
          colors.length > 0
            ? colors.map((color) => ({
                colorId: color.id,
              }))
            : [],
      },
    },
    photos: {
      createMany: {
        data: photos ? photos : [],
      },
    },
  })

  try {
    const createdPet = await prisma.pet.create({
      data: prismaPetCreateInput,
      include: prismaPetIncludeBase,
    })

    if (!createdPet) {
      await logAction({
        userId,
        profileId: profileId,
        action: 'CREATE_PET_ERROR',
        metadata: {
          input: prismaPetCreateInput,
        },
      })
      return errorResponse('Failed to create a pet')
    }

    await logAction({
      userId,
      profileId: profileId,
      action: 'CREATE_PET',
      metadata: {
        input: prismaPetCreateInput,
      },
    })

    const tagsToRevalidate = ['pets', 'unique_colors_from_cats', 'unique_colors_from_dogs']
    tagsToRevalidate.forEach(revalidateTag)

    return successResponse('Pet created successfully', createdPet)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    await logAction({
      userId,
      profileId: profileId,
      action: 'CREATE_PET_ERROR',
      metadata: {
        error: parsedError.message,
        input: prismaPetCreateInput,
      },
    })
    return errorResponse(parsedError.message)
  }
}

export const getPetBaseById = async (id: string) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: prismaPetIncludeBase,
    })
    if (!pet) {
      return errorResponse('Pet not found')
    }
    return successResponse('Pet found', pet)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    return errorResponse(parsedError.message)
  }
}

export const getPetBaseByNickName = async (nickName: string) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { nickName },
      include: prismaPetIncludeBase,
    })
    if (!pet) {
      return errorResponse('Pet not found')
    }
    return successResponse('Pet found', pet)
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export async function getPetFullByNickName(nickName: string) {
  try {
    const pet = await prisma.pet.findUnique({ where: { nickName }, include: prismaPetIncludeFull })
    if (!pet) return errorResponse('Pet not found')
    return successResponse('Pet found', pet)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    return errorResponse(parsedError.message)
  }
}

export const getPetsBase = async (profileNickName: string) => {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        profile: {
          nickName: profileNickName,
        },
      },
      include: prismaPetIncludeBase,
    })
    if (!pets) {
      return null
    }
    return pets
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export const getCachedPetsBase = unstable_cache(getPetsBase, ['pets'], { tags: ['pets'] })

export const updatePet = async ({
  id,
  name,
  nickName,
  birthDate,
  type,
  gender,
  furType,
  isReadyForAdoption,
  isFeatured,
  isAdopted,
  isPublished,
  petProfile,
  profile,
  colors,
  photos,
}: PetUpdateInputData) => {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an pet')
  }
  const profileId = (await prisma.profile.findUnique({ where: { nickName: profile?.nickName } }))
    ?.id
  if (!profileId) return errorResponse('No profile found with this nickName')

  try {
    const petToUpdate = await prisma.pet.findUnique({
      where: { id },
      select: {
        profileId: true,
      },
    })
    if (!petToUpdate) {
      return errorResponse('Pet not found')
    }
    const hasPermissions = await validateUserProfileRole(userId, petToUpdate.profileId, [
      UserProfileRole.PROFILE_OWNER,
      UserProfileRole.PROFILE_ADMIN,
      UserProfileRole.PROFILE_MANAGER,
    ])
    if (!hasPermissions) {
      await logAction({
        userId,
        profileId: profileId,
        action: 'CREATE_PET_ERROR',
        metadata: {
          error: 'User does not have permission to update pet for selected profiles',
        },
      })
      return errorResponse('You do not have permission to create pet for selected profiles')
    }

    const prismaPetUpdateInput = Prisma.validator<Prisma.PetUpdateInput>()({
      name,
      nickName,
      birthDate,
      type,
      gender,
      furType,
      isReadyForAdoption,
      isFeatured,
      isAdopted,
      isPublished,
      petProfile: {
        update: {
          isSocialized: petProfile?.isSocialized,
          isFriendlyWithCats: petProfile?.isFriendlyWithCats,
          isFriendlyWithDogs: petProfile?.isFriendlyWithDogs,
          isFriendlyWithOtherAnimals: petProfile?.isFriendlyWithOtherAnimals,
          isLitterBoxTrained: petProfile?.isLitterBoxTrained,
          isUsesScratchingPost: petProfile?.isUsesScratchingPost,
          isSterilized: petProfile?.isSterilized,
          isVaccinated: petProfile?.isVaccinated,
          isTreatedForParasites: petProfile?.isTreatedForParasites,
          healthStatus: petProfile?.healthStatus,
          biography: petProfile?.biography,
        },
      },
      colors: colors.length
        ? {
            create: colors.map((color) => ({
              color: {
                connect: {
                  id: color.id,
                },
              },
            })),
          }
        : undefined,
      photos: {
        upsert: photos.map((photo) => ({
          where: {
            s3Key: photo.s3Key,
          },
          update: {
            altText: photo.altText,
            isAvatar: photo.isAvatar,
            isPrimary: photo.isPrimary,
          },
          create: {
            s3Key: photo.s3Key,
            src: photo.src,
            width: photo.width,
            height: photo.height,
            altText: photo.altText,
            isAvatar: photo.isAvatar,
            isPrimary: photo.isPrimary,
          },
        })),
      },
    })
    const updatedPet = await prisma.pet.update({
      where: { id },
      data: prismaPetUpdateInput,
      include: prismaPetIncludeBase,
    })
    if (!updatedPet) {
      await logAction({
        userId,
        petId: id,
        profileId: profileId,
        action: 'UPDATE_PET_ERROR',
        metadata: {
          input: prismaPetUpdateInput,
        },
      })
      return errorResponse('Failed to update a pet')
    }

    await logAction({
      userId,
      petId: id,
      profileId: profileId,
      action: 'UPDATE_PET',
      metadata: {
        input: prismaPetUpdateInput,
      },
    })

    const tagsToRevalidate = ['pets', 'unique_colors_from_cats', 'unique_colors_from_dogs']
    tagsToRevalidate.forEach(revalidateTag)

    return successResponse('Pet updated successfully', updatedPet)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    await logAction({
      userId,
      profileId: profileId,
      action: 'CREATE_PET_ERROR',
      metadata: {
        error: parsedError.message,
      },
    })
    return errorResponse(parsedError.message)
  }
}

export const deletePet = async (id: string) => {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an pet')
  }
  try {
    const petToDelete = await prisma.pet.findUnique({
      where: { id },
      select: {
        id: true,
        profileId: true,
      },
    })
    if (!petToDelete) {
      return errorResponse('Pet not found')
    }
    const hasPermissions = await validateUserProfileRole(userId, petToDelete.profileId, [
      UserProfileRole.PROFILE_OWNER,
      UserProfileRole.PROFILE_ADMIN,
      UserProfileRole.PROFILE_MANAGER,
    ])
    if (!hasPermissions) {
      await logAction({
        userId,
        profileId: petToDelete.profileId,
        petId: id,
        action: 'CREATE_PET_ERROR',
        metadata: {
          error: 'User does not have permission to update pet for selected profiles',
        },
      })
      return errorResponse('You do not have permission to create pet for selected profiles')
    }
    const deletedPet = await prisma.pet.delete({
      where: { id },
      select: {
        id: true,
        profileId: true,
      },
    })
    if (!deletedPet) {
      await logAction({
        userId,
        petId: id,
        profileId: petToDelete.profileId,
        action: 'DELETE_PET_ERROR',
        metadata: {
          pet: deletedPet,
        },
      })
      return errorResponse('Failed to delete a pet')
    }
    await logAction({
      userId,
      petId: id,
      profileId: petToDelete.profileId,
      action: 'DELETE_PET',
      metadata: {
        pet: deletedPet,
      },
    })
    const tagsToRevalidate = ['pets', 'unique_colors_from_cats', 'unique_colors_from_dogs']
    tagsToRevalidate.forEach(revalidateTag)

    return successResponse('Pet deleted successfully', deletedPet)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    await logAction({
      userId,
      petId: id,
      action: 'DELETE_PET_ERROR',
      metadata: {
        error: parsedError.message,
      },
    })
    return errorResponse(`Failed to delete a pet: ${parsedError.message}`)
  }
}
