import IPatient from '@/types/Patient';
import { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
  children?: ReactNode;
}

type IPatientContext = {
    currentPatient: IPatient
    setCurrentPatient: (selectedPatient: IPatient) => void
}

export const initialPatient: IPatient = {
  noadmsip: 0,
  firstname: 'Marie-Jade',
  lastname: 'Marcil',
  dateofbirth: '2000-01-07',
  gender:'F',
  lifetimenumber: 2141493,
  weight: 70.0,
  idealweight: 70.0,
  height: 163,
  primarydiagnosis: 'Asthmatique',
  lastloadingtime: '2023-05-08',
}

const initialValue = {
  currentPatient: initialPatient,
  setCurrentPatient: () => {console.log('default method')}
}

const CurrentPatientContext = createContext<IPatientContext>(initialValue)

export function CurrentPatientProvider({ children }: Props) {
    const [currentPatient, setCurrentPatient] = useState<IPatient>(initialValue.currentPatient)

    return (
    <CurrentPatientContext.Provider value={{ currentPatient, setCurrentPatient }}>
        {children}
    </CurrentPatientContext.Provider>
    )
}

export const usePatient = () => useContext(CurrentPatientContext)