/**
 * KPIs Data Context
 * 
 * This context provides a way to manage and share the KPIs (Key Point Indicators) data.
 * It fetches the KPIs data using the provided query function and the current patient's information.
 * 
 * @module KpisContext
 */


import { useQuery } from "@tanstack/react-query"
import { createContext, useContext } from "react";
import { usePatient } from "@/contexts/CurrentPatientContext";
import KpiService, { KpisApiResponse } from "@/services/KpiService";

type Params = {
  queryKey: [string, { noadmsip: number | undefined }]
}

async function getKpisData(params: Params) {
  const [ , { noadmsip }] = params.queryKey;
  if(!noadmsip) return undefined
  
  const response = await KpiService.findAll(noadmsip)

  return response
}

type KpisContextType = {
  data: KpisApiResponse | undefined
}

const KpisContext = createContext<KpisContextType>(undefined!);

export function KpisDataProvider({ children }: { children: React.ReactNode }) {
  const { currentPatient } = usePatient()
  const { data: kpisData } = useQuery({ queryKey : ["kpis", { noadmsip: currentPatient?.noadmsip }], queryFn: getKpisData, enabled: !!currentPatient })

  return <KpisContext.Provider value={{ data: kpisData }}>
            {children}
        </ KpisContext.Provider>;
}

export const useKpisData = () => useContext(KpisContext)