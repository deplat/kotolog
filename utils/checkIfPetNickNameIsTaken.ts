import { getPetIdByNickName } from '@/data-access'

export async function checkIfPetNickNameIsTaken(nickName: string, id?: string) {
  try {
    const pet = await getPetIdByNickName(nickName)
    return !(!pet || pet.id == id)
  } catch (error) {
    // TODO
    console.error(error)
  }
}
