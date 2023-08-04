import { IPatient, KpiData } from '@/state/types';
import axios, { AxiosResponse } from 'axios';

const API_URL = "http://localhost:5000";
const PATIENTS_PATH = `${API_URL}/patients`

interface IPatientApiResponse {
  data: IPatient | IPatient[];
}

// Utility function for date to age conversion
function dateOfBirthToAgeFormat(dateOfBirth: string | undefined ): string | undefined  {
  if (!dateOfBirth) return undefined;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let ageYear = today.getFullYear() - birthDate.getFullYear();
  let ageMonth = today.getMonth() - birthDate.getMonth();
  let ageDay = today.getDate() - birthDate.getDate();

  if (ageDay < 0) {
    ageMonth--;
    const daysInLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageDay += daysInLastMonth;
  }

  if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12;
  }

  return `Age: ${ageYear}a ${ageMonth}m ${ageDay}j`;
};

export class Patient {

  patient: IPatient;

  public constructor(patient: IPatient) { 
    this.patient = patient
  }

  *[Symbol.iterator](): IterableIterator<Patient> {
    yield this;
  }

  get age(): string | undefined {
    return dateOfBirthToAgeFormat(this.patient.dateOfBirth);
  }
}

export default class Patients implements Iterable<IPatient> {
  private patients: IPatient[] = [];

  constructor(patients: IPatient[]) {
    if(patients)
      this.patients = patients.map(patient => patient);
  }

  *[Symbol.iterator](): IterableIterator<IPatient> {
    if(this.patients.length > 0)
      for (const patient of this.patients) {
        yield patient;
      }
  }

  get(): IPatient[] {
    return this.patients;
  }

  getByNoadmsip(noadmsip: number): IPatient | undefined {
    return this.patients.find((patient) => patient.noadmsip === noadmsip);
  }
}

const instance =  axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-type": "application/json"
    }
});

const responseBody = (response: AxiosResponse<IPatientApiResponse>) => {
  const data = response.data;
  console.log('DATA', data);

  if (Array.isArray(data)) {
    return new Patients(data).get();
  }
  return [];
};

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
  getAll: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const PATIENTS = {
	// getOne: (noadmsip: number): Promise<Patient> => requests.get(`${PATIENTS_PATH}/${noadmsip}`),
  getAll: (): Promise<IPatient[]> => requests.getAll(PATIENTS_PATH),
  // getAllKpis: (noadmsip: number): Promise<KpiData[]> => requests.getAll(`${PATIENTS_PATH}/${noadmsip}/kpis`),
  // getAllKpisByTimeFrame: (noadmsip: number, timeframe: number):  Promise<KpiData[]> => requests.getAll(`${PATIENTS_PATH}/${noadmsip}/kpis/${timeframe}`),
	// delete: (noadmsip: number): Promise<void> => requests.delete(`${PATIENTS_PATH}/${noadmsip}`),
};
