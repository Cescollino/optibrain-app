import { createContext, ReactNode, useEffect, useState } from 'react';
import { DefaultPatient, KpiData, IPatient } from '@/state/types';
import { PATIENTS } from '@/api/kpiService';

type KpiContextType = {
  kpiData: KpiData[];
  setKpiData: (newKpi: KpiData[]) => void
};

type Props = {
  patient: IPatient;
  children?: ReactNode;
};

const initialValue = {
  kpiData: [],
  setKpiData: () => {}
}

const KpiContext = createContext<KpiContextType>(initialValue);


const KpiProvider = ({ patient, children }: Props) => {
  const [kpiData, setKpiData] = useState<KpiData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (patient.data.noadmsip) {
                const data = await PATIENTS.getAllKpis(patient.data.noadmsip);
                setKpiData(data);
                console.log(data);
            }   
        } catch (err) {
        console.error('Error fetching kpiData:', err);
        }
    };

    fetchData();
  }, [patient]);

  return (
    <KpiContext.Provider value={{ kpiData, setKpiData }}>
      {children}
    </KpiContext.Provider>
  );
};

export { KpiContext, KpiProvider };
