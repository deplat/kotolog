type AgeGroup = 'Молодой' | 'Взрослый' | 'Не указано'
type ProcessedAgeData = {
  ageString: string
  ageGroup: AgeGroup
}

export function getAgeDataFromBirthDate(birthDate: Date | null): ProcessedAgeData {
  if (!birthDate) return { ageString: '\u00A0', ageGroup: 'Не указано' }

  const today = new Date()

  if (birthDate > today) return { ageString: '\u00A0', ageGroup: 'Не указано' }

  const yearDifference = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  const dayDifference = today.getDate() - birthDate.getDate()

  const adjustedMonths = dayDifference < 0 ? monthDifference - 1 : monthDifference

  const ageString =
    yearDifference > 0 ? formatAgeInYears(yearDifference) : formatAgeInMonths(adjustedMonths)
  const ageGroup = yearDifference > 0 ? 'Взрослый' : 'Молодой'

  return {
    ageString,
    ageGroup,
  }
}

function formatAgeInMonths(months: number): string {
  const forms: [string, string, string] = ['месяц', 'месяца', 'месяцев']
  return `${months} ${getRussianWordForm(months, forms)}`
}

const formatAgeInYears = (years: number): string => {
  const forms: [string, string, string] = ['год', 'года', 'лет']
  return `${years} ${getRussianWordForm(years, forms)}`
}

function getRussianWordForm(count: number, forms: [string, string, string]): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return forms[1]
  return forms[2]
}
