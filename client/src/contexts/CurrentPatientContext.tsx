import IPatientData from '@/types/Patient';
import { createContext, ReactNode, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  children?: ReactNode;
}

export type IPatientContext = {
    currentPatient: IPatientData;
    setCurrentPatient: (selectedPatient: IPatientData) => void
}

const initialPatient: IPatientData = {
    noadmsip: 3563,
    firstName: 'NA',
    lastName: 'NA',
    dateOfBirth: 'NA',
    gender: 'M',
    lifetimeNumber: 0,
    weight: 0.0,
    idealWeight: 0.0,
    height: 0.0,
    primaryDiagnosis: 'NA',
    lastLoadingTime: undefined,
  };

const initialValue = {
  currentPatient: initialPatient,
  setCurrentPatient: (selectedPatient: IPatientData) => {}
}

const CurrentPatientContext = createContext<IPatientContext>(initialValue);

const CurrentPatientProvider = ({ children }: Props) => {
   
    const [currentPatient, setCurrentPatient] = useState(initialValue.currentPatient);

    return (
    <CurrentPatientContext.Provider value={{ currentPatient, setCurrentPatient }}>
        {children}
    </CurrentPatientContext.Provider>
    )
};

export { CurrentPatientContext, CurrentPatientProvider };