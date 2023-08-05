<<<<<<< Updated upstream
import { IPatient, KpiData } from '@/state/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
=======
import { IPatient, KpiData } from '@/types/types';
import axios, { AxiosResponse } from 'axios';
>>>>>>> Stashed changes

const API_URL = "http://localhost:5000";
const PATIENTS_PATH = `${API_URL}/patients`

interface IPatientApiResponse {
  status: number;
  data?: IPatient[];
  error?: AxiosError;
}


interface Params {
  baseUrl: string
headers : any
method: string
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

const getConfig : Params = {
  baseUrl: API_URL,
      headers: {
          "Authorization": ""
      },
  method: 'get'
};

export const getApi = async (): Promise<IPatientApiResponse> =>{
  return await axios({
      ...getConfig,
      url: `${getConfig.baseUrl}/${PATIENTS_PATH}`,
  }).then ( (response) => {
      console.log('Fetching data response : ', response)
      return {
          status: response.status,
          data: response.data
      } as IPatientApiResponse
  }).catch((error: AxiosError) =>{
      console.log('Error when fetching patients data : ',error)
      return {
          status: error.status,
          error: error.response
      } as IPatientApiResponse
  })
};
