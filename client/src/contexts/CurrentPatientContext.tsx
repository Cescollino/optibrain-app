/**
 * Current Patient Context
 * 
 * This context provides a way to manage and share the currently selected patient's information 
 * after the all patients are fetched. It includes the current patient's details and a function 
 * to update the selected patient.
 * 
 * @module CurrentPatientContext
 */


import IPatient from '@/types/Patient';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type Props = {
  children?: ReactNode;
}

type IPatientContext = {
    currentPatient: IPatient | undefined
    setCurrentPatient: (selectedPatient: IPatient | undefined) => void
}

const initialValues = {
  currentPatient: undefined,
  setCurrentPatient: () => {}
}

const CurrentPatientContext = createContext<IPatientContext>(initialValues)

export function CurrentPatientProvider({ children }: Props) {
  const [currentPatient, setCurrentPatient] = useState<IPatient | undefined>(initialValues.currentPatient)

  return (
    <CurrentPatientContext.Provider value={{ currentPatient, setCurrentPatient }}>
        {children}
    </CurrentPatientContext.Provider>
  )
}

export const useCurrentPatient = () => useContext(CurrentPatientContext)