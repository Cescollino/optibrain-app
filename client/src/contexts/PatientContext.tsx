import { createContext, useState, ReactNode } from 'react';
import { IPatient } from '@/state/types';

type Props = {
  children?: ReactNode;
};

type PatientContextType = {
  patient: IPatient | null;
  setPatient: (newPatient: IPatient | null) => void;
};

const initialValue: PatientContextType = {
  patient: null,
  setPatient: () => {}
};

const PatientContext = createContext<PatientContextType>(initialValue);

const PatientProvider = ({ children }: Props) => {
  const [patient, setPatient] = useState<IPatient | null>(null);

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientContext, PatientProvider };
