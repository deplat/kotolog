export interface WishImageData {
  id?: string
  wishId?: string
  s3Key?: string
  src?: string
  width?: number
  height?: number
  altText?: string
  isPrimary?: boolean
}

export interface WishImageCreateData {
  s3Key: string
  src: string
  width: number
  height: number
  altText?: string
  isPrimary?: boolean
}

export interface WishImageUpdateData {
  id: string
  altText?: string
  isPrimary?: boolean
}

export interface WishImageDeleteData {
  id: string
}
