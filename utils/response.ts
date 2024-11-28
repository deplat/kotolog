import { any } from 'prop-types'

export const successResponse = (message: string, data: any) => ({
  success: true,
  message,
  data,
})

export const errorResponse = (message: string, data?: any) => ({
  success: false,
  message,
  data,
})
