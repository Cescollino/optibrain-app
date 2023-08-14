// TODO : Change the data structure so it contains the horodate of each score
export interface IGlobalDeviationScore {
    numberOfHours: number;
    value: number;
}

function average(arrayOfScores: number[]): number {
    const numberOfHours = arrayOfScores.length
    const sum = arrayOfScores.reduce((accumulator, currentScore) => accumulator + currentScore, 0)
    const value = sum / numberOfHours * 100
    return value
}

export function kpisGlobalScore(scores: number[]) {
    const kpisAverageScores = average(scores)
    return kpisAverageScores
}