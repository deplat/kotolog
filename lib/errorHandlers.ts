import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library'

export const prismaErrorHandler = <T>(error: T) => {
  if (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientRustPanicError
  ) {
    return new Error('Prisma error: ' + error.message)
  } else if (error instanceof Error) {
    return new Error('Error: ' + error.message)
  } else {
    return new Error('Unknown error: ' + error)
  }
}
