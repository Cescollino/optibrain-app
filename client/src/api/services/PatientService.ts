/* CRUD functions 

* CREATE: create
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

import { apiClient } from "@/api/client";
import { IPatient } from "@/types/Patient";


const findAll = async () => {
  const response = await apiClient.get<IPatient[]>("/patients")
  return response.data
}

const findByNoadmsip = async (noadmsip: number) => {
  const response = await apiClient.get<IPatient>(`/patient/noadmsip/${noadmsip}`)
  return response.data
}

const deleteByNoamsip = async (noadmsip: number) => {
  const response = await apiClient.delete<any>(`/patient/noadmsip/${noadmsip}`)
  return response.data
};

const deleteAll = async () => {
  const response = await apiClient.delete<any>(`/patients`);
  return response.data
};


const PatientService = {
  findAll,
  findByNoadmsip,
  deleteByNoamsip,
  deleteAll,
};

export default PatientService;
