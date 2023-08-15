import { apiClient } from "@/api/client"


// eslint-disable-next-line no-template-curly-in-string
const KPI_ENDPOINT = "/patient/noadmsip/${noadmsip}/kpis";


export type KpiVariables = "PPC" | "PICm" | "LICOX" | "Pupilles" | "PVCm" | "PAm" | "ETCO2" | "PACO2" | "Glycemie" | "INR" | "Plaquettes" | "Analgo" | "Nutrition" | "TeteLit" | "Temperature"

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
    [key in KpiVariables]: Data[]
}

const findAll = async (noadmsip: number) => {
    const response = await apiClient.get<ContinuousData[]>(`/patient/noadmsip/${noadmsip}/kpis`)
    response.data.map(kpi => kpi as ContinuousData)
    return response.data
}
  
const findByVariable = async (noadmsip: number, kpi: string) => {
    const response = await apiClient.get<ContinuousData>(`/patient/noadmsip/${noadmsip}/kpis/${kpi}`)
    return response.data as ContinuousData
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<ContinuousData>(`${KPI_ENDPOINT}/timeFrame/${timeFrame}`)
    return response.data
}
  
const KpiService = {
    findAll,
    findByVariable,
    findAllByTimeFrame,
}
  
export default KpiService
  