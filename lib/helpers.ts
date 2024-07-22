export const getAge = (birth: string | Date): string => {
    const today = new Date();
    const birthDate = (birth instanceof Date) ? birth : new Date(birth);
    const yearDifference = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (yearDifference < 0 || (yearDifference === 0 && monthDifference < 0) || (yearDifference === 0 && monthDifference === 0 && dayDifference < 0)) {
        return '\u00A0';
    }

    if (yearDifference === 0 && monthDifference === 0 && dayDifference === 0) {
        return '\u00A0';
    }

    if (yearDifference === 0) {
        const ageInMonths = monthDifference + (dayDifference < 0 ? -1 : 0);
        if (ageInMonths === 0) {
            return '\u00A0';
        }
        return formatAgeInMonths(ageInMonths);
    }

    const ageInYears = yearDifference + (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0) ? -1 : 0); // Adjust for months and days if negative
    return formatAgeInYears(ageInYears);
}

const formatAgeInMonths = (months: number): string => {
    switch (months) {
        case 1:
            return `${months} месяц`;
        case 2:
        case 3:
        case 4:
            return `${months} месяца`;
        default:
            return `${months} месяцев`;
    }
}

const formatAgeInYears = (years: number): string => {
    if (years === 0) return '\u00A0';
    if (years % 10 === 1 && years % 100 !== 11) {
        return `${years} год`;
    } else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
        return `${years} года`;
    } else {
        return `${years} лет`;
    }
}
