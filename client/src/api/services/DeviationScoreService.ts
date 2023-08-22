import { apiClient } from "@/api/client"
import { IDeviationKpiData } from "@/types/DeviationData"

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

const DEV_SCORE_ENDPOINT = "/patient/noadmsip"

export interface DeviationApiResponse {
    "PAm": IDeviationKpiData[]  
}

const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<DeviationApiResponse>(`${DEV_SCORE_ENDPOINT}/${noadmsip}/deviationScores`)
    return response.data
}
  
const findByKpi = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi)
    if (!filteredKpiOptions) return

    const response = await apiClient.get<IDeviationKpiData[]>(`${DEV_SCORE_ENDPOINT}/${noadmsip}/deviationScores/kpi/${kpi}`)
    return response.data
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<IDeviationKpiData[]>(`${DEV_SCORE_ENDPOINT}/${noadmsip}/deviationScores/timeFrame/${timeFrame}`)
    return response.data
}

const DeviationScoreService = {
    findAll,
    findByKpi,
    findAllByTimeFrame,
}
  
export default DeviationScoreService