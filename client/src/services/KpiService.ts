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


export interface ContinuKpiData {
    id: number;
    kpi: string;
    noadmsip: number;
    value: number | string;
    uniteofmesure?: string;
    state?: string;
    horodate: string; 
}

export interface KpisApiResponse {
    "PPC": ContinuKpiData[],
    "PICm": ContinuKpiData[],
    "LICOX": ContinuKpiData[],
    "Pupilles": ContinuKpiData[],
    "PVCm": ContinuKpiData[],
    "PAm": ContinuKpiData[],
    "ETCO2": ContinuKpiData[],
    "PaCO2": ContinuKpiData[],
    "Glycemie": ContinuKpiData[],
    "INR": ContinuKpiData[],
    "Plaquettes": ContinuKpiData[],
    "Temperature": ContinuKpiData[],
    "TeteLit": ContinuKpiData[],
}

const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<KpisApiResponse>(`/patient/noadmsip/${noadmsip}/kpis`)
    return response.data
}
  
const findByVariable = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi);
    if (!filteredKpiOptions) return;

    const response = await apiClient.get<ContinuKpiData[]>(`/patient/noadmsip/${noadmsip}/kpis/${kpi}`)
    return response.data
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<ContinuKpiData[]>(`/patient/noadmsip/${noadmsip}/kpis/timeFrame/${timeFrame}`)
    return response.data
}
  
const KpiService = {
    findAll,
    findByVariable,
    findAllByTimeFrame,
}
  
export default KpiService
  