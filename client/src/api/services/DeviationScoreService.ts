import { apiClient } from "@/api/client"

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

const DEV_SCORE_ENDPOINT = "/patient/noadmsip";
// eslint-disable-next-line no-template-curly-in-string
const DEVIATION_SCORES_ENDPOINT = "${DEV_SCORE_ENDPOINT}/${noadmsip}/deviationScores";

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
    const response = await apiClient.get<DeviationApiResponse>(`${DEVIATION_SCORES_ENDPOINT}`)
    return response.data
}
  
const findByKpi = async (noadmsip: number, kpi: string) => {
    const filteredKpiOptions = KpiVariableOptions.filter((k) => k === kpi);
    if (!filteredKpiOptions) return;

    const response = await apiClient.get<IDeviationKpiData[]>(`${DEVIATION_SCORES_ENDPOINT}/kpi/${kpi}`)
    return response.data
}

const findAllByTimeFrame = async (noadmsip: number, timeFrame: number) => {
    const response = await apiClient.get<IDeviationKpiData[]>(`${DEVIATION_SCORES_ENDPOINT}/timeFrame/${timeFrame}`)
    return response.data
}

const DeviationScoreService = {
    findAll,
    findByKpi,
    findAllByTimeFrame,
}
  
export default DeviationScoreService