import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

export const prismaErrorHandler = <T>(error: T) => {
  // Handle specific Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    // Handle known Prisma client errors (e.g., violation of database constraints)
    return new Error('Prisma known error: ' + error.message + ` (Code: ${error.code})`)
  } else if (error instanceof PrismaClientUnknownRequestError) {
    // Handle unknown Prisma client errors
    return new Error('Prisma unknown error: ' + error.message)
  } else if (error instanceof PrismaClientRustPanicError) {
    // Handle Prisma panic errors (usually indicate issues with the database engine)
    return new Error('Prisma Rust panic error: ' + error.message)
  } else if (error instanceof PrismaClientInitializationError) {
    // Handle Prisma initialization errors (e.g., issues connecting to the database)
    return new Error('Prisma initialization error: ' + error.message)
  } else if (error instanceof PrismaClientValidationError) {
    // Handle validation errors (e.g., invalid data passed to a Prisma query)
    return new Error('Prisma validation error: ' + error.message)
  }

  // Handle other generic JavaScript errors
  if (error instanceof TypeError) {
    return new Error('Type error: ' + error.message)
  } else if (error instanceof SyntaxError) {
    return new Error('Syntax error: ' + error.message)
  } else if (error instanceof RangeError) {
    return new Error('Range error: ' + error.message)
  }

  // Handle all other JavaScript errors
  if (error instanceof Error) {
    return new Error('Error: ' + error.message)
  }

  // For any unknown or unhandled errors
  return new Error('Unknown error: ' + JSON.stringify(error))
}
