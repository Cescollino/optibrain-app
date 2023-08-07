import http from "@/http-common";
import IPatientData from "@/types/Patient";

const getAll = () => {
  return http.get<Array<IPatientData>>("/patients");
};

const get = (noadmsip: number) => {
  return http.get<IPatientData>(`/patients/${noadmsip}`);
};

const create = (data: IPatientData) => {
  return http.post<IPatientData>("/patients", data);
};

const update = (noadmsip: number, data: IPatientData) => {
  return http.put<any>(`/patients/${noadmsip}`, data);
};

const remove = (noadmsip: any) => {
  return http.delete<any>(`/patients/${noadmsip}`);
};

const removeAll = () => {
  return http.delete<any>(`/patients`);
};

const findByNoadmsip = (noadmsip: number) => {
  return http.get<Array<IPatientData>>(`/patients?noadmsip=${noadmsip}`);
};

const PatientDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNoadmsip,
};

export default PatientDataService;


// // Utility function for date to age conversion
// function dateOfBirthToAgeFormat(dateOfBirth: string | undefined ): string | undefined  {
// if (!dateOfBirth) return undefined;
// const today = new Date();
// const birthDate = new Date(dateOfBirth);

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
