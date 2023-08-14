import IPatient from '@/types/Patient';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { usePatients } from '@/contexts/PatientsContext';

type Props = {
  children?: ReactNode;
}

type IPatientContext = {
    currentPatient: IPatient | undefined
    setCurrentPatient: (selectedPatient: IPatient) => void
}

const CurrentPatientContext = createContext<IPatientContext>(undefined!)

export function CurrentPatientProvider({ children }: Props) {
    const { patients } = usePatients()
    const [currentPatient, setCurrentPatient] = useState<IPatient >()

    const noadmsip = 3563  /* Noadmsip : Numéro d'admission soins intensifs pédiatriques */
    const scenarioPatient = patients?.find( patient => patient.noadmsip === noadmsip )

    useEffect(() => {
      if(patients && scenarioPatient) 
        setCurrentPatient(scenarioPatient)
    }, [scenarioPatient])

    return (
    <CurrentPatientContext.Provider value={{ currentPatient, setCurrentPatient }}>
        {children}
    </CurrentPatientContext.Provider>
    )
}

export const usePatient = () => useContext(CurrentPatientContext)