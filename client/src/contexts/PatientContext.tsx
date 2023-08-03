import { createContext, useState, ReactNode } from 'react';
import { PatientData } from '@/state/types';

type Props = {
  children?: ReactNode;
};

type PatientContextType = {
  patient: PatientData | null;
  setPatient: (newPatient: PatientData | null) => void;
};

const initialValue: PatientContextType = {
  patient: null,
  setPatient: () => {}
};

const PatientContext = createContext<PatientContextType>(initialValue);

const PatientProvider = ({ children }: Props) => {
  const [patient, setPatient] = useState<PatientData | null>(null);

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientContext, PatientProvider };
