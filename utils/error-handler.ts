import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

export const prismaErrorHandler = <T>(error: T): Error => {
  if (error instanceof PrismaClientKnownRequestError) {
    return new Error(`Prisma known error: ${error.message} (Code: ${error.code})`)
  } else if (error instanceof PrismaClientUnknownRequestError) {
    return new Error(`Prisma unknown error: ${error.message}`)
  } else if (error instanceof PrismaClientRustPanicError) {
    return new Error(`Prisma Rust panic error: ${error.message}`)
  } else if (error instanceof PrismaClientInitializationError) {
    return new Error(`Prisma initialization error: ${error.message}`)
  } else if (error instanceof PrismaClientValidationError) {
    return new Error(`Prisma validation error: ${error.message}`)
  }

  if (error instanceof TypeError) {
    return new Error(`Type error: ${error.message}`)
  } else if (error instanceof SyntaxError) {
    return new Error(`Syntax error: ${error.message}`)
  } else if (error instanceof RangeError) {
    return new Error(`Range error: ${error.message}`)
  }

  if (error instanceof Error) {
    return new Error(`Error: ${error.message}`)
  }

  return new Error(`Unknown error: ${JSON.stringify(error)}`)
}
