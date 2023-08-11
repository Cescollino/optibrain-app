import { useQuery } from "@tanstack/react-query"
import DeviationScoreService, { IDeviationKpiData} from "@/services/DeviationScoreService";
import { createContext, useContext } from "react";
import { usePatient } from "@/contexts/CurrentPatientContext";

type Params = {
    queryKey: [string, { noadmsip: number }]
}
  
async function getDeviationScores(params: Params) {
  const [ , { noadmsip }] = params.queryKey;
  const response = await DeviationScoreService.findAll(noadmsip);

  console.log('DEVIATION SCORE : ', response)
  return response
}

type DeviationContextType = {
  deviationData: IDeviationKpiData[] | undefined;
}

const DeviationScoreContext = createContext<DeviationContextType>(undefined!);

export function DeviationScoreProvider({ children }: { children: React.ReactNode }) {
  const { currentPatient } = usePatient()
  const { data: deviationData } = useQuery(["patient", { noadmsip: currentPatient.noadmsip }], getDeviationScores);

  return <DeviationScoreContext.Provider value={{ deviationData }}>
            {children}
        </ DeviationScoreContext.Provider>;
}

export const useDeviationScore = () => useContext(DeviationScoreContext)