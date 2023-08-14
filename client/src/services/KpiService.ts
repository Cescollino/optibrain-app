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

// eslint-disable-next-line no-template-curly-in-string
const KPI_ENDPOINT = "/patient/noadmsip/${noadmsip}/kpis";

export interface ContinuousData {
    id: number;
    kpi: string;
    noadmsip: number;
    value: number | string;
    uniteofmesure?: string;
    state?: string;
    horodate: string; 
}

export interface KpisApiResponse {
    [key: string]: ContinuousData[];
}
  

const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<KpisApiResponse>(`${KPI_ENDPOINT}`)
    return response.data
}
  
const findByVariable = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi);
    if (!filteredKpiOptions) return;

    const response = await apiClient.get<ContinuousData[]>(`${KPI_ENDPOINT}/${kpi}`)
    return response.data
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<ContinuousData[]>(`${KPI_ENDPOINT}/timeFrame/${timeFrame}`)
    return response.data
}
  
const KpiService = {
    findAll,
    findByVariable,
    findAllByTimeFrame,
}
  
export default KpiService
  