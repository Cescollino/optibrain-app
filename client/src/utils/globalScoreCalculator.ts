// TODO : Change the data structure so it contains the horodate of each score
export interface IGlobalDeviationScore {
    numberOfHours: number;
    value: number;
}

export function kpiGlobalScore(scores: number[]): IGlobalDeviationScore  {
    let value = 0;
    // Score data is calculated each hour (ask Gilles to know more)
    const numberOfHours = scores.length

    if (!numberOfHours) 
        return { numberOfHours, value }

    const sum = scores.reduce((accumulator, currentScore) => accumulator + currentScore, 0);
    value = sum / numberOfHours * 100;
    return { numberOfHours, value };
}

export function kpisGlobalScore(scores:  ((0 | 1) []) []): number {
    const kpisAverageScores = scores.map((kpiScores) => kpiGlobalScore(kpiScores).value)

    return kpiGlobalScore(kpisAverageScores).value
}