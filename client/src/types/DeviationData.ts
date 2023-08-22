// TODO : restructure this interface depending on the data we get from the API (flask-server/server.py)

export interface IDeviationKpiData { 
    id: number
    kpi: string
    noadmsip: number
    score: number
    hour: number
    lastLoadingTime: string
}