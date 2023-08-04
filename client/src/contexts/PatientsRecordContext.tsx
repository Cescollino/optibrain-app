import { createContext, useState, ReactNode, useEffect } from 'react';
import { IPatient, PatientRecordData } from '@/state/types';
import { PatientStatus, StatusColor } from '@/types/patientState';;

type Props = {
  children?: ReactNode;
};

type PatientsRecordContextType = {
  patientsRecord: PatientRecordData[];
  setRecords: (patientsData: PatientRecordData[]) => void;
};

const initialValue: PatientsRecordContextType = {
    patientsRecord: [] as PatientRecordData[],
    setRecords: () => {},
};

const PatientsRecordContext = createContext<PatientsRecordContextType>(initialValue);

const PatientRecordProvider = ({ children }: Props) => {
  const [patientsRecord, setRecords] = useState<PatientRecordData[]>(initialValue.patientsRecord);
  
    return (
      <PatientsRecordContext.Provider value={{ patientsRecord, setRecords }}>
        {children}
      </PatientsRecordContext.Provider>
    );
  };
  
  export { PatientsRecordContext, PatientRecordProvider };
