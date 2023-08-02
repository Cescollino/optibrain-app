import { PatientData, KpiData } from '@/state/types';
import axios, { AxiosResponse } from 'axios';

const instance =  axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-type": "application/json"
    }
});


const API_URL = "http://localhost:5000";

const responseBody = (response: AxiosResponse) => response.data

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
  getAll: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};


const PATIENTS_PATH = `${API_URL}/patients`
export const PATIENTS = {
	getOne: (noadmsip: number): Promise<PatientData> => requests.get(`${PATIENTS_PATH}/${noadmsip}`),
  getAll: (): Promise<PatientData[]> => requests.getAll(PATIENTS_PATH),
  getAllKpis: (noadmsip: number): Promise<KpiData[]> => requests.getAll(`${PATIENTS_PATH}/${noadmsip}/kpis`),
  getAllKpisByTimeFrame: (noadmsip: number, timeframe: number):  Promise<KpiData[]> => requests.getAll(`${PATIENTS_PATH}/${noadmsip}/kpis/${timeframe}`),
	delete: (noadmsip: number): Promise<void> => requests.delete(`${PATIENTS_PATH}/${noadmsip}`),
};

