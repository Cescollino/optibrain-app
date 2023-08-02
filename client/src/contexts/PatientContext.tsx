import { createContext, ReactNode, useEffect, useState } from 'react';
import { DefaultPatient, PatientData } from '@/state/types';
import { PATIENTS } from '@/services/kpiService';

type Props = {
  children?: ReactNode;
};

type PatientContextType = {
  patient: PatientData | null;
  setPatientData: (newPatient: PatientData) => void;
};

const initialValue: PatientContextType = {
  patient: null,
  setPatientData: () => {}
};

const PatientContext = createContext<PatientContextType>(initialValue);

const PatientProvider = ({ children }: Props) => {
  const [patient, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if(patient) {
          const patientData = await PATIENTS.getOne(DefaultPatient.noadmsip);
          setPatientData(patientData);
          console.log('Fetched patient data:', patientData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <PatientContext.Provider value={{ patient, setPatientData }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientContext, PatientProvider };
