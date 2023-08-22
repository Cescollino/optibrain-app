import { IPatient } from "@/types/Patient"
import { IDeviationKpiData } from "@/types/DeviationData"

export const DEFAULT_PATIENTS_DATA: IPatient[] =[
    {
        noadmsip: 3563,
        firstname: 'Marie',
        lastname: 'Tremblay',
        dateofbirth: '2000-07-01',
        gender: 'F',
        lifetimenumber: 2141492,
        weight: 70.0,
        idealweight: 70.0,
        height: 168,
        primarydiagnosis: 'brain',
        intime: '2023-08-01 12:00:00',
        outtime: null,
        lastloadingtime: '2023-08-22 12:00:00',
    } as IPatient
]   

export const DEFAULT_PATIENT_DATA: IPatient = {
    noadmsip: 3563,
    firstname: 'Marie',
    lastname: 'Tremblay',
    dateofbirth: '2000-07-01',
    gender: 'F',
    lifetimenumber: 2141492,
    weight: 70.0,
    idealweight: 70.0,
    height: 168,
    primarydiagnosis: 'brain',
    intime: '2023-08-01 12:00:00',
    outtime: null,
    lastloadingtime: '2023-08-22 12:00:00',
}

const KPI_VARIABLES_ARRAY = [
    "PPC", 
    "PICm", 
    "LICOX", 
    "Pupilles", 
    "PVCm", 
    "PAm", 
    "ETCO2", 
    "PACO2", 
    "Glycemie", 
    "INR", 
    "Plaquettes", 
    "Analgo", 
    "Nutrition", 
    "TeteLit", 
    "Temperature",
]

let DEFAULT_DEVIATION_DATA: IDeviationKpiData[] = []
let id = Math.floor(Math.random() * 1000)
let score = Math.floor(Math.random())

KPI_VARIABLES_ARRAY.map(kpi => DEFAULT_DEVIATION_DATA.push(
    {
        id,
        kpi,
        noadmsip: 3563,
        score,
        hour: 0,
        lastLoadingTime: '2023-08-22 12:00:00',
    } as IDeviationKpiData,
))

export { DEFAULT_DEVIATION_DATA }

// TODO : implement a function to separate the data in days
export const DEFAULT_GLOBAL_ADHERENCE_CHART_DATA: { day: string; score: number }[] = [
    { day: "J0", score: 40 },
    { day: "J01", score: 40 },
    { day: "J02", score: 40 },
    { day: "J03", score: 60 },
    { day: "J04", score: 60 },
    { day: "J05", score: 60 },
    { day: "J06", score: 60 },
    { day: "J07", score: 80 },
    { day: "J08", score: 80 },
    { day: "J09", score: 80 },
    { day: "J10", score: 80 },
]


// TODO : implement a reducer and dispatch to update the data
// The states are represented numerically between 0 and 5 for the chart
export const DEFAULT_NEURO_STATE_CHART_DATA: { time: string; state: number; }[] = [
    { time: "4:00", state: 2 },
    { time: '4:30', state: 2 },
    { time: '5:00', state: 2 },
    { time: '5:30', state: 2 },
    { time: '6:30', state: 2 },
    { time: '7:00', state: 1 },
    { time: '7:30', state: 5 },
    { time: '8:00', state: 2 },
]

// Glasgow score is between 3 and 15
export const DEFAULT_GLASGOW_CHART_DATA: { day: string; score: number; }[] = [
    { day: "", score: 8 },
    { day: "J01", score: 8 },
    { day: "J02",  score: 8 },
    { day: "J03",  score: 10 },
    { day: "J04",  score: 10 },
    { day: "J05",  score: 10 },
    { day: "J06",  score: 10 },
    { day: "J07",  score: 14 },
    { day: "J08",  score: 14 },
    { day: "J09", score: 14 },
    { day: "J10",  score: 14 },
]
