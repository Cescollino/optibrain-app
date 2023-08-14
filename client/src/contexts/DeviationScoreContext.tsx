import { useQuery } from "@tanstack/react-query"
import DeviationScoreService, { DeviationApiResponse, IDeviationKpiData } from "@/services/DeviationScoreService";
import { createContext, useContext } from "react";
import { usePatient } from "@/contexts/CurrentPatientContext";

type Params = {
  queryKey: [string, { noadmsip: number | undefined }]
}

async function getDeviationScores(params: Params) {
  const [ , { noadmsip }] = params.queryKey;
  if(!noadmsip) return undefined
  
  const response = await DeviationScoreService.findAll(noadmsip)
  
  return response
}

type DeviationContextType = {
  data: DeviationApiResponse | undefined
}

const DeviationScoreContext = createContext<DeviationContextType>(undefined!);

export function DeviationScoreProvider({ children }: { children: React.ReactNode }) {
  const { currentPatient } = usePatient()
  const { data: deviationData } = useQuery({ queryKey : ["deviation", { noadmsip: currentPatient?.noadmsip }], queryFn: getDeviationScores, enabled: !!currentPatient })

 
  return <DeviationScoreContext.Provider value={{ data: deviationData }}>
            {children}
        </ DeviationScoreContext.Provider>;
}

export const useDeviationScore = () => useContext(DeviationScoreContext)