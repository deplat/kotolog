import { Path } from 'react-hook-form'
import { FurType, PetGender, PetType } from '@prisma/client'

interface CheckboxFieldOption<T> {
  key: Path<T>
  label: string
}

export const controlsFields: CheckboxFieldOption<any>[] = [
  { key: 'isPublished', label: 'Опубликован' },
  { key: 'isReadyForAdoption', label: 'Готов к пристрою' },
  { key: 'isFeatured', label: 'Активный пристрой' },
  { key: 'isAdopted', label: 'Принят в семью' },
]

export const healthAndBehaviorFields: CheckboxFieldOption<any>[] = [
  { key: 'petProfile.isVaccinated', label: 'Vaccinated' },
  { key: 'petProfile.isSterilized', label: 'Sterilized' },
  { key: 'petProfile.isTreatedForParasites', label: 'Treated for Parasites' },
  { key: 'petProfile.isLitterBoxTrained', label: 'Litter Box Trained' },
  { key: 'petProfile.isUsesScratchingPost', label: 'Uses Scratching Post' },
  { key: 'petProfile.isSocialized', label: 'Socialized' },
  { key: 'petProfile.isFriendlyWithCats', label: 'Friendly with Cats' },
  { key: 'petProfile.isFriendlyWithDogs', label: 'Friendly with Dogs' },
  { key: 'petProfile.isFriendlyWithOtherAnimals', label: 'Friendly with Other Animals' },
]

export const speciesOptions = [
  { value: PetType.CAT, label: 'Кошка' },
  { value: PetType.DOG, label: 'Собака' },
]

export const genderOptions = [
  { value: PetGender.MALE, label: 'Мальчик' },
  { value: PetGender.FEMALE, label: 'Девочка' },
]

export const furTypeOptions = [
  { value: FurType.SHORT, label: 'Короткий' },
  { value: FurType.LONG, label: 'Длинный' },
  { value: FurType.MEDIUM, label: 'Средний' },
  { value: FurType.HAIRLESS, label: 'Без шерсти' },
  { value: FurType.NONE, label: 'Не указано' },
]
