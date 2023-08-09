import { apiClient } from "./PatientService"

// 0 if not in the target value  or  1 if in the target value
export interface IDeviationScore {
    hour: number;
    score: 0 | 1;
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
    const response = await apiClient.get<IDeviationScore[]>(`/patients/${noadmsip}/deviationScores`)
    return response.data
}
  
const findByKpi = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi);
    if (!filteredKpiOptions) return;

    const response = await apiClient.get<IDeviationScore[]>(`/patients/${noadmsip}/deviationScores/${kpi}`)
    return response.data
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<IDeviationScore[]>(`/patients/${noadmsip}/deviationScores/timeFrame/${timeFrame}`)
    return response.data
}
  
const DeviationScoreService = {
    findAll,
    findByKpi,
    findAllByTimeFrame,
}
  
export default DeviationScoreService