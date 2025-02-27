import { z } from 'zod'

export const basePetSchema = z.object({
  name: z.string().nonempty({ message: 'Требуется укзать имя питомца' }),
  nickName: z.string({ required_error: 'Укажите никнейм питомца' }),
  birthDate: z.date({
    required_error: 'Укажите дату рождения (примерно, если нет точных сведений)',
  }),
  type: z.enum(['CAT', 'DOG']),
  gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN', 'HERMAPHRODITE', 'ASEXUAL', 'NONE']),
  furType: z.enum(['SHORT', 'MEDIUM', 'LONG', 'HAIRLESS', 'NONE']),
  isReadyForAdoption: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isAdopted: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  isVaccinated: z.boolean().optional(),
  isSterilized: z.boolean().optional(),
  isTreatedForParasites: z.boolean().optional(),
  isLitterBoxTrained: z.boolean().optional(),
  isUsesScratchingPost: z.boolean().optional(),
  isSocialized: z.boolean().optional(),
  isFriendlyWithCats: z.boolean().optional(),
  isFriendlyWithDogs: z.boolean().optional(),
  isFriendlyWithOtherAnimals: z.boolean().optional(),
  status: z.enum(['ACTIVE', 'ARCHIVED', 'SUSPENDED']),
  profileId: z.string().cuid(),
  archivedReason: z.string().optional(),
  suspendedReason: z.string().optional(),
  colors: z.array(z.string()),
  bio: z.string().optional(),
  photos: z.array(
    z.object({
      s3key: z.string(),
      src: z.string().url(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      altText: z.string().optional(),
      isAvatar: z.boolean().optional(),
      isPrimary: z.boolean().optional(),
    })
  ),
})

export const createPetSchema = basePetSchema

export const updatePetSchema = basePetSchema.partial().extend({
  id: z.string().cuid(),
  photosToDelete: z.array(z.string().cuid()).optional(),
  photosToAdd: z.array(
    z.object({
      s3key: z.string(),
      src: z.string().url(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      altText: z.string().optional(),
      isAvatar: z.boolean().optional(),
      isPrimary: z.boolean().optional(),
    })
  ),
  profileId: z.string().cuid().optional(),
})

export type CreatePetData = z.infer<typeof createPetSchema>
export type UpdatePetData = z.infer<typeof updatePetSchema>
