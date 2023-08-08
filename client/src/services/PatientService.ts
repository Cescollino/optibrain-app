/* CRUD functions 

* CREATE: create (we won't use it in this appliation)
* RETRIEVE: findAll, findById
* UPDATE: update
* DELETE: deleteById, deleteAll
* FINDER: findByNoadmsip or findById

*/

/* RESTful API naming convention 

HTTP GET api/patients	--> Get all patients
HTTP POST  api/patients	   --> Create new patient

HTTP GET api/patients/{id}    //Get patient for given Id (noadmsip)
HTTP PUT api/patients/{id}       //Update patient for given Id
HTTP DELETE api/patients/{id}   //Delete patient for given Id

*/

import axios, { AxiosResponse } from "axios";
import IPatient from "@/types/Patient";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});

const findAll = async () => {
  const response = await apiClient.get<IPatient[]>("/patients")
  return response.data
}

const findByNoadmsip = async (noadmsip: number) => {
  const response = await apiClient.get<IPatient>(`/patients/${noadmsip}`)
  return response
}

const deleteByNoamsip = async (noadmsip: number) => {
  const response = await apiClient.delete<any>(`/patients/${noadmsip}`)
  return response
};

const deleteAll = async () => {
  const response = await apiClient.delete<any>(`/patients`);
  return response
};


const PatientService = {
  findAll,
  findByNoadmsip,
  deleteByNoamsip,
  deleteAll,
};

export default PatientService;


// // Utility function for date to age conversion
// function dataofbirthToAgeFormat(dataofbirth: string | undefined ): string | undefined  {
// if (!dataofbirth) return undefined;
// const today = new Date();
// const birthDate = new Date(dataofbirth);

// let ageYear = today.getFullYear() - birthDate.getFullYear();
// let ageMonth = today.getMonth() - birthDate.getMonth();
// let ageDay = today.getDate() - birthDate.getDate();

// if (ageDay < 0) {
//   ageMonth--;
//   const daysInLastMonth = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     0
//   ).getDate();
//   ageDay += daysInLastMonth;
// }

// if (ageMonth < 0) {
//   ageYear--;
//   ageMonth += 12;
// }

// return `Age: ${ageYear}a ${ageMonth}m ${ageDay}j`;

// };

// const getConfig : Params = {
//   baseUrl: API_URL,
//       headers: {
//           "Authorization": ""
//       },
//   method: 'get'
// };

// export const getApi = async (): Promise<IPatientApiResponse> =>{
//   return await axios({
//       ...getConfig,
//       url: `${getConfig.baseUrl}/${PATIENTS_PATH}`,
//   }).then ( (response) => {
//       console.log('Fetching data response : ', response)
//       return {
//           status: response.status,
//           data: response.data
//       } as IPatientApiResponse
//   }).catch((error: AxiosError) =>{
//       console.log('Error when fetching patients data : ',error)
//       return {
//           status: error.status,
//           error: error.response
//       } as IPatientApiResponse
//   })
// };
