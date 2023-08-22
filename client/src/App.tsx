import { BrowserRouter } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { themeSettings } from "@/theme"
import Routes from "@/Routes"

import { AuthenticationProvider } from "@/contexts/AuthenticationContext";
import KpiService, { ContinuousData } from "@/api/services/KpiService"
import { KpisDataProvider } from "@/contexts/KpisContext";

import { CurrentPatientProvider, useCurrentPatient } from "@/contexts/CurrentPatientContext"
import { IPatient } from "@/types/Patient"
import { PatientsProvider, usePatients } from "@/contexts/PatientsContext"
import PatientService from "@/api/services/PatientService"
import { DEFAULT_PATIENTS_DATA, DEFAULT_PATIENT_DATA} from "@/utils/initialData"



// type Params = {
//   queryKey: [string, {noadmsip: number, kpi: string}]
// }

// type Param = {
//   queryKey: [string, { noadmsip: number }]
// }

// async function getOneKpi(params: Params): Promise<ContinuousData> {
//   const [, { noadmsip, kpi }] = params.queryKey
//   return await KpiService.findByVariable(noadmsip, kpi)
// }

// async function getAllPatientKpis(param: Param): Promise<ContinuousData[]> {
//   const [, { noadmsip }] = param.queryKey
//   return await KpiService.findAll(noadmsip)
// }

// async function getAllPatients(): Promise<IPatient[]> {
//   return await PatientService.findAll()
// }

export function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])

  // TODO: uncomment when the database is ready

  // const { isLoading: isLoadingPatients, isError: isErrorPatients, data: patientsData } = useQuery({ queryKey : ["patients"], queryFn: getAllPatients })
  
  // // Scenario patient Numéro d'admssion SIP : noadmsip
  // const noadmsip = 3563
  // const selectedPatient = useMemo(()  => patientsData?.find((patient) => patient.noadmsip === noadmsip), [noadmsip, patientsData])

  // // Enabled allows the query to execute only when the selected patient is fetched
  // const {isLoading: isLoadingKpis, isError: isErrorKpis, data: kpis} = useQuery(["kpi", { noadmsip: noadmsip } ], getAllPatientKpis, { enabled: Boolean(patientsData && selectedPatient) } )

  // if (isLoadingPatients || isLoadingKpis) {
  //   return <div>Loading...</div>;
  // }

  // if (isErrorPatients || isErrorKpis) {
  //   return <div>Error...</div>;
  // }
  
  return (
    <div className="app" >
      <ThemeProvider theme={theme} >
         <BrowserRouter>
         <AuthenticationProvider>
          <PatientsProvider>
            <CurrentPatientProvider>
              <Routes patients={DEFAULT_PATIENTS_DATA} currentPatient={DEFAULT_PATIENT_DATA} />
            </CurrentPatientProvider>
          </PatientsProvider>
          </AuthenticationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App



