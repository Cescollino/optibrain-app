import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import KpiService, { ContinuousData } from "@/api/services/KpiService";
import PatientService from "@/api/services/PatientService";
import { Typography } from "@mui/material";
import IPatient from "@/types/Patient";


import { AuthenticationProvider } from "@/contexts/AuthenticationContext";
import Routes from "@/Routes";
import { BrowserRouter } from "react-router-dom";
import { PatientsProvider, usePatients } from "@/contexts/PatientsContext";
import { CurrentPatientProvider, useCurrentPatient } from "@/contexts/CurrentPatientContext";
import { KpisDataProvider } from "./contexts/KpisContext";


type Params = {
  queryKey: [string, {noadmsip: number, kpi: string}]
}

type Param = {
  queryKey: [string, { noadmsip: number }]
}

async function getPatientKpi(params: Params): Promise<ContinuousData> {
  const [, { noadmsip, kpi }] = params.queryKey
  return await KpiService.findByVariable(noadmsip, kpi)
}

async function getAllPatientKpis(param: Param): Promise<ContinuousData[]> {
  const [, { noadmsip }] = param.queryKey
  return await KpiService.findAll(noadmsip)
}

async function getAllPatients(): Promise<IPatient[]> {
  return await PatientService.findAll()
}

export function App() {
  // Scenario patient Numéro d'admssion SIP : noadmsip
  const noadmsip = 3563

  const { data: patientsData } = useQuery({ queryKey : ["patients"], queryFn: getAllPatients })
  const fetchedPatient = patientsData?.find(p => ( p.noadmsip === noadmsip ))
  
  // Enabled allows the query to execute only when the selected patient is fetched
  const {isLoading, isError, data: kpis, error} = useQuery(["kpi", { noadmsip: noadmsip } ], getAllPatientKpis, { enabled: Boolean(fetchedPatient) } )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="app" >
      <BrowserRouter>
      <PatientsProvider>
        <CurrentPatientProvider>
          <KpisDataProvider>
          <AuthenticationProvider>
            <Routes patients={patientsData!} currentPatient={fetchedPatient} kpisData={kpis}/>
          </AuthenticationProvider>
          </KpisDataProvider>
        </CurrentPatientProvider>
      </PatientsProvider>
      </BrowserRouter>
    </div>
  )
}

export default App



