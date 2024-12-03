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
  { key: 'petProfile.isVaccinated', label: 'Вакцинирован' },
  { key: 'petProfile.isSterilized', label: 'Стерилизован' },
  { key: 'petProfile.isTreatedForParasites', label: 'Обработан от паразитов' },
  { key: 'petProfile.isLitterBoxTrained', label: 'Прошел обучение в литтер-боксе' },
  { key: 'petProfile.isUsesScratchingPost', label: 'Пользуется когтеточкой' },
  { key: 'petProfile.isSocialized', label: 'Социализирован' },
  { key: 'petProfile.isFriendlyWithCats', label: 'Ладит с кошками' },
  { key: 'petProfile.isFriendlyWithDogs', label: 'Ладит с собаками' },
  { key: 'petProfile.isFriendlyWithOtherAnimals', label: 'Ладит с другими животными' },
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
