export const getAge = (birth: string | Date): string => {
    const today = new Date();
    const birthDate = (birth instanceof Date) ? birth : new Date(birth);
    const yearDifference = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust for negative months and days
    let adjustedYearDifference = yearDifference;
    let adjustedMonthDifference = monthDifference;

    if (dayDifference < 0) {
        adjustedMonthDifference--;
    }
    if (adjustedMonthDifference < 0) {
        adjustedMonthDifference += 12;
        adjustedYearDifference--;
    }

    if (adjustedYearDifference < 0) {
        return '\u00A0';
    }

    if (adjustedYearDifference === 0) {
        if (adjustedMonthDifference === 0) {
            return '\u00A0';
        }
        return formatAgeInMonths(adjustedMonthDifference);
    }

    return formatAgeInYears(adjustedYearDifference);
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
    if (years % 10 === 1 && years % 100 !== 11) {
        return `${years} год`;
    } else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
        return `${years} года`;
    } else {
        return `${years} лет`;
    }
}
