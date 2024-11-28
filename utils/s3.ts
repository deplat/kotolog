import { PetImageData } from '@/types/pet'

export const uploadImageFileAndReturnImageData = async (
  file: File
): Promise<{ s3Key: string; src: string }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    })

    if (!response.ok) {
      throw new Error('Failed to get presigned url')
    }

    const { url, fields } = await response.json()

    const formData = new FormData()
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    formData.append('file', file)

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file')
    }

    return {
      s3Key: fields.key as string,
      src: `${url}${fields.key}`,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
