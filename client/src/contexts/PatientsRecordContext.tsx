import { createContext, useState, ReactNode } from 'react';
import { PatientRecordData } from '@/state/types';

type Props = {
  children?: ReactNode;
};

type PatientsRecordContextType = {
  patientsRecord: PatientRecordData[];
  setRecords: (newPatientRecord: PatientRecordData[]) => void;
};

const initialValue: PatientsRecordContextType = {
    patientsRecord: [],
    setRecords: () => {}
};

const PatientsRecordContext = createContext<PatientsRecordContextType>(initialValue);

const PatientProvider = ({ children }: Props) => {
  const [patientsRecord, setRecords] = useState<PatientRecordData[]>(initialValue.patientsRecord);

  return (
    <PatientsRecordContext.Provider value={{ patientsRecord, setRecords }}>
      {children}
    </PatientsRecordContext.Provider>
  );
};

export { PatientsRecordContext, PatientProvider };