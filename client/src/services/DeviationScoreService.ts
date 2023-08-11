import { apiClient } from "./PatientService"
import { kpisGlobalScore } from "@/utils/globalScoreCalculator";

// 0 if not in the target value  or  1 if in the target value
export interface IDeviationKpiData {
    kpi: string;
    noadmsip: number;
    scores: (1|0) [];
    uniteofmesure?: string;
    lastLoadingTime: string;
}

const KpiVariableOptions: string[] = [
    "PPC",
    "PICm",
    "LICOX",
    "Pupilles",
    "PVCm",
    "PAm",
    "ETCO2",
    "PaCO2",
    "Glycemie",
    "INR",
    "Plaquettes",
    "Temperature",
    "TeteLit",
]

const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<IDeviationKpiData[]>(`/patient/noadmsip/${noadmsip}/deviationScores`)
    console.log('deviation', response.data)
    return response.data
}
  
const findByKpi = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi);
    if (!filteredKpiOptions) return;

    const response = await apiClient.get<IDeviationKpiData[]>(`/patient/noadmsip/${noadmsip}/deviationScores/kpi/${kpi}`)
    return response.data
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<IDeviationKpiData[]>(`/patient/noadmsip/${noadmsip}/deviationScores/timeFrame/${timeFrame}`)
    return response.data
}

const getGlobalScore = async (noadmsip: number): Promise<number> => {
    const data = await findAll(noadmsip)

    const kpisScores = data.map((kpi) => kpi.scores)
    const value = kpisGlobalScore(kpisScores)
    console.log('globalScore', value)

    return value
} 
  
const DeviationScoreService = {
    findAll,
    findByKpi,
    findAllByTimeFrame,
    getGlobalScore,
}
  
export default DeviationScoreService