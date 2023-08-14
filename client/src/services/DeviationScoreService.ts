import { apiClient } from "@/services/PatientService"



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


export interface IDeviationKpiData { 
    kpi: string;
    noadmsip: number;
    scores: number[];
    uniteofmesure?: string;
    lastLoadingTime: string;
}

export interface DeviationApiResponse {
    "PAm": IDeviationKpiData[]  
}


const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<DeviationApiResponse>(`/patient/noadmsip/${noadmsip}/deviationScores`)
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

  
const DeviationScoreService = {
    findAll,
    findByKpi,
    findAllByTimeFrame,
}
  
export default DeviationScoreService