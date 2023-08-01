import { PatientData, KpiData } from '@/state/types';
import axios, { AxiosResponse, formToJSON } from 'axios';

const instance =  axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-type": "application/json"
    }
});

const responseBody = (response: AxiosResponse) => {
  return {
    noadmsip: response.data[0][0],
    firstName:  response.data[0][1],
    lastName:  response.data[0][2],
    dateOfBirth:  response.data[0][3],
    gender: response.data[0][4],
    lifetimeNumber: response.data[0][7],
    weight: response.data[0][6],
    idealWeight: response.data[0][7],
    height: response.data[0][8],
    primaryDiagnosis: response.data[0][9],
    lastLoadingTime:  response.data[0][10],
  }
  
}

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const PATIENT = {
	get: (noadmsip: number): Promise<PatientData> => requests.get(`http://localhost:5000/patients/${noadmsip}`),
	delete: (noadmsip: number): Promise<void> => requests.delete(`/patients/${noadmsip}`),
};


/* Key point indicators (KPIs) */
export const KPIs = {
    getOne: (noadmsip: number, kpi: string): Promise<KpiData> => requests.get(`/patients/${noadmsip}/kpis/${kpi}`),
    getOneByTimeFrame: (noadmsip: number, kpi: string, timeFrame: number): Promise<KpiData[]> => requests.get(`/patients/${noadmsip}/kpis/${kpi}/${timeFrame}`),
    getAll: (noadmsip: number): Promise<KpiData[]> => requests.get(`/patients/${noadmsip}/kpis`),
    getAllByTimeFrame: (noadmsip: number, timeFrame: number): Promise<KpiData[]> => requests.get(`/patients/${noadmsip}/kpis/${timeFrame}`),
    deleteAll: (): Promise<string> => requests.delete('/') 
}
