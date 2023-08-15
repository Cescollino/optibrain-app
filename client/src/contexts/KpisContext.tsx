/**
 * KPIs Data Context
 * 
 * This context provides a way to manage and share the KPIs (Key Point Indicators) data.
 * It fetches the KPIs data using the provided query function and the current patient's information.
 * 
 * @module KpisContext
 */


import { createContext, useContext, useState } from "react";
import { ContinuousData }  from "@/api/services/KpiService";

type KpisContextType = {
  patientKpisData: ContinuousData[] | undefined
  addKpisData: (newKpisData: ContinuousData[]) => void
}

const KpisContext = createContext<KpisContextType>(undefined!);

export function KpisDataProvider({ children }: { children: React.ReactNode }) {
  const [patientKpisData, setPatientKpisData] = useState<ContinuousData[]>([])

  const addKpisData = (newKpiData: ContinuousData[]) => {
    setPatientKpisData([...patientKpisData, ...newKpiData])
  }

  return <KpisContext.Provider value={{ patientKpisData, addKpisData }}>
            {children}
        </ KpisContext.Provider>;
}

export const useKpisData = () => useContext(KpisContext)