/* Function to calculate the average score of each key point indicators (kpi) */

// TODO : Change the data structure so it contains the horodate of each score
export interface IGlobalDeviationScore {
    numberOfHours: number;
    value: number;
}

export function kpisGlobalScore(scores: number[]): number {
    const numberOfHours = scores.length // Time interval
    const sum = scores.reduce((accumulator, currentScore) => accumulator + currentScore, 0)
    const value = sum / numberOfHours * 100
    return value
}