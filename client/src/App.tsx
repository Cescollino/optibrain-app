import { QueryClient, hashQueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import KpiService, { ContinuousData, Data } from "@/services/KpiService";
import PatientService from "@/services/PatientService";

type Params = {
  queryKey: [string, { noadmsip: number }]
}

async function getKpisData(params: Params): Promise<Data[]> {
  const [ , { noadmsip }] = params.queryKey;

  const response = await KpiService.findByVariable(noadmsip, "ppc")
  return response
}

async function getAllPatients() {
  const patientsFetched = await PatientService.findAll()
  return patientsFetched
}

export function App() {
  const noadmsip = 3563
  console.log("Render");

  
  const {isLoading, isError, data, error} = useQuery({ queryKey : ["kpis", { noadmsip: noadmsip }], queryFn: getKpisData })

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("Error: ", error);
    return <div>Error...</div>;
  }
  

  return (
    <div >
       {data.map((data, index) => (
          <div key={index}>
            {data.kpi}
          </div>
        ))}
      </div>
  );
}

export default App



