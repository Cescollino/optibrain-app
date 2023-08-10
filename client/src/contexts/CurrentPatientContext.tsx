import IPatient from '@/types/Patient';
import { createContext, ReactNode, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  children?: ReactNode;
}

export type IPatientContext = {
    currentPatient: IPatient
    setCurrentPatient: (selectedPatient: IPatient) => void
}

const initialPatient: IPatient = {
    noadmsip: 3563,
    firstname: 'NA',
    lastname: 'NA',
    dateofbirth: 'NA',
    gender: 'M',
    lifetimenumber: 0,
    weight: 0.0,
    idealweight: 0.0,
    height: 0.0,
    primarydiagnosis: 'NA',
    lastloadingtime: undefined,
};

const initialValue = {
  currentPatient: initialPatient,
  setCurrentPatient: () => {}
}

const CurrentPatientContext = createContext<IPatientContext>(initialValue);

const CurrentPatientProvider = ({ children }: Props) => {
    const [currentPatient, setCurrentPatient] = useState<IPatient>(initialValue.currentPatient);

    return (
    <CurrentPatientContext.Provider value={{ currentPatient, setCurrentPatient }}>
        {children}
    </CurrentPatientContext.Provider>
    )
};

export { CurrentPatientContext, CurrentPatientProvider };