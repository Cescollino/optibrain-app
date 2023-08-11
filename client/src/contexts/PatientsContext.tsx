import IPatient from '@/types/Patient'
import { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
  children?: ReactNode
}

type IPatientsContext = {
    patients: IPatient[]
    addPatients: (newPatients: IPatient[]) => void
}

const initialValue = {
  patients: [],
  addPatients: () => {}
}

const PatientsContext = createContext<IPatientsContext>(initialValue);

export function PatientsProvider({ children }: Props) {
    const [patients, setPatients] = useState<IPatient[]>(initialValue.patients);

    const addPatients = (newPatients: IPatient[]) => {
      setPatients((patients) => [...patients, ...newPatients])
    }
    
    return (
    <PatientsContext.Provider value={{ patients, addPatients }}>
        {children}
    </PatientsContext.Provider>
    )
}

export const usePatients = () => useContext(PatientsContext)