import IPatient from '@/types/Patient';
import { createContext, ReactNode, useState } from 'react'

type Props = {
  children?: ReactNode;
}

export type IPatientsContext = {
    patients: IPatient[]
    addPatient: (newPatient: IPatient) => void
}

// const initialPatient: IPatient = {
//     noadmsip: 3563,
//     firstname: 'NA',
//     lastname: 'NA',
//     dateofbirth: 'NA',
//     gender: 'M',
//     lifetimenumber: 0,
//     weight: 0.0,
//     idealweight: 0.0,
//     height: 0.0,
//     primarydiagnosis: 'NA',
//     lastloadingtime: undefined,
// };

const initialValue = {
  patients: [],
  addPatient: () => {}
}

const PatientsContext = createContext<IPatientsContext>(initialValue);

const PatientsProvider = ({ children }: Props) => {
    const [patients, setPatients] = useState<IPatient[]>(initialValue.patients);

    const addPatient = (newPatient: IPatient) => setPatients((patients) => [...patients, newPatient])

    return (
    <PatientsContext.Provider value={{ patients, addPatient }}>
        {children}
    </PatientsContext.Provider>
    )
};

export { PatientsContext, PatientsProvider };