import { PatientData, KpiData } from '@/state/types';
import axios, { AxiosResponse } from 'axios';

const instance =  axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-type": "application/json"
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const PATIENT = {
	get: (noadmsip: number): Promise<PatientData> => requests.get(`patients/${noadmsip}`),
	delete: (noadmsip: number): Promise<void> => requests.delete(`patients/${noadmsip}`),
};

export const KPIs = {
    getAll: (noadmsip: number): Promise<KpiData[]> => requests.get(`kpis/${noadmsip}`),
    getAllByTimeFrame: (noadmsip: number, timeFrame: number): Promise<KpiData[]> => requests.get(`kpis/${noadmsip}/${timeFrame}`),
}
