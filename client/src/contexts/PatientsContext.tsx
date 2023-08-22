/**
 * Patients Context
 * 
 * This context provides a way to manage and share the patients' data across different
 * components. It fetches the patients' data using the provided query function and provides
 * status and error information as well.
 * 
 * @module PatientsContext
 */

import { IPatient } from '@/types/Patient'
import { ReactNode, createContext, useContext, useState } from 'react'


type Props = {
  children?: ReactNode;
}

type IPatientsContext = {
  patients: IPatient[] | undefined
  addPatients: (fetchedPatients: IPatient[]) => void
}

const initialValues = {
  patients: undefined,
  addPatients: () => {}
}

const PatientsContext = createContext<IPatientsContext>(initialValues!);


export function PatientsProvider({ children }: Props) {
  const [patients, setPatients] = useState<IPatient[]>([])

  const addPatients = (newPatients: IPatient[]) => {
    setPatients([...patients, ...newPatients])
  }

  return (
    <PatientsContext.Provider value={{ patients, addPatients }}>
        {children}
    </PatientsContext.Provider>
    )
}

export const usePatients = () => useContext(PatientsContext)