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


type KpiVariables = "ppc" | "pic" | "licox" | "pupilles" | "pvc" | "pam" | "etco2" | "paco2" | "glycemie" | "inr" | "plaquettes" | "analgo" | "nutrition" | "tete" | "temperature"
  
export interface Data {
    horodate: string
    id: number
    kpi: string
    lastloadingtime: string
    noadmsip: number
    uniteofmesure?: string
    state?: string
    value: number | string
}

export type ContinuousData = {
    ppc: Data[]
}

const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<ContinuousData>(`/patient/noadmsip/${noadmsip}/kpis`)
    return response.data
}
  
const findByVariable = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi);


    const response = await apiClient.get<ContinuousData>(`/patient/noadmsip/${noadmsip}/kpis/${kpi}`)
    return response.data.ppc
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
  