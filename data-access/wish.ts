import { prisma } from '@/prisma/prisma'
import { Prisma, UserProfileRole } from '@prisma/client'
import { WishCreateData, WishData, WishDeleteData } from '@/types/wish'
import { validateUserProfileRole } from '@/utils/validateUserProfileRole'
import { prismaErrorHandler } from '@/utils/error-handler'
import { logAction } from '@/utils/logging'

export async function createWish({
  name,
  description,
  links,
  images,
  profileId,
}: WishCreateData): Promise<{ data?: WishData; message?: string }> {
  try {
    const { success, hasRole, userId } = await validateUserProfileRole(profileId, [
      UserProfileRole.PROFILE_OWNER,
      UserProfileRole.PROFILE_ADMIN,
      UserProfileRole.PROFILE_MANAGER,
    ])

    if (!success) {
      return {
        message: 'Error validating user permissions',
      }
    } else if (!hasRole) {
      return {
        message: 'User does not have permission to create a wish',
      }
    }

    const imagesData = images.map((img) => ({
      ...img,
      altText: img.altText || name,
    }))

    const validatedWishCreateData = Prisma.validator<Prisma.WishCreateInput>()({
      name,
      description,
      links,
      images: {
        createMany: {
          data: imagesData,
        },
      },
      profile: {
        connect: {
          id: profileId,
        },
      },
    })
    const newWish = await prisma.wish.create({
      data: validatedWishCreateData,
    })

    if (newWish) {
      await logAction({
        action: 'CREATE_WISH',
        userId,
        profileId,
        metadata: {
          wishId: newWish.id,
        },
      })
      return { data: newWish }
    } else {
      await logAction({
        action: 'CREATE_WISH_ERROR',
        userId,
        profileId,
        metadata: {
          error: 'Failed to create wish',
          input: validatedWishCreateData,
        },
      })
      return { message: 'Error creating wish' }
    }
  } catch (err) {
    const parsedError = prismaErrorHandler(err)
    await logAction({
      profileId,
      action: 'CREATE_WISH_ERROR',
      metadata: {
        error: parsedError.message,
      },
    })
    return { message: 'Error creating wish: ' + parsedError.message }
  }
}

export async function deleteWish({id}: WishDeleteData) {
  try {

  }
}