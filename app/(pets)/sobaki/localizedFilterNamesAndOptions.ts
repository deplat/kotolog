export const localizedFilterNames = {
  gender: 'Пол',
  ageGroup: 'Возрастная группа',
  furType: 'Тип шерсти',
  color: 'Окрас',
}

// Function to localize the gender options
export const localizedGender = (value: string) => {
  switch (value) {
    case 'MALE':
      return 'Мальчик'
    case 'FEMALE':
      return 'Девочка'
    default:
      return value
  }
}

// Function to localize the age group options
export const localizedAgeGroup = (value: string) => {
  switch (value) {
    case 'PUPPY':
      return 'Щенок (до 1 года)'
    case 'ADULT':
      return 'Взрослый'
    default:
      return value
  }
}

// Function to localize the fur type options
export const localizedFurType = (value: string) => {
  switch (value) {
    case 'SHORT':
      return 'Короткая'
    case 'MEDIUM':
      return 'Средняя'
    case 'LONG':
      return 'Длинная'
    case 'HAIRLESS':
      return 'Без шерсти'
    default:
      return value
  }
}
