
// Function to format age in years, months, and days 
export function dateOfBirthToAge(dateofbirth: string): string {
    const today = new Date();
    const birthDate = new Date(dateofbirth);

    let ageYear = today.getFullYear() - birthDate.getFullYear();
    let ageMonth = today.getMonth() - birthDate.getMonth();
    let ageDay = today.getDate() - birthDate.getDate();

    if (ageDay < 0) {
    ageMonth--;
    const daysInLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
    ).getDate();
    ageDay += daysInLastMonth;
    }

    if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12;
    }

    return `Age: ${ageYear}a ${ageMonth}m ${ageDay}j`;

}

