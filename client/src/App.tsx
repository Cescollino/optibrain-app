import React, { useContext, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";

import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { CurrentPatientContext, CurrentPatientProvider } from "@/contexts/CurrentPatientContext";
import Routes from "@/Routes"

import IPatient from "@/types/Patient";
import PatientService from "@/services/PatientService";
import { PatientsContext, PatientsProvider } from "./contexts/PatientsContext";

/* Noadmsip : Numéro d'admission soins intensifs pédiatriques */

const App: React.FC = () => {
  const { patients, addPatient } = useContext(PatientsContext)
  const { currentPatient, setCurrentPatient } = useContext(CurrentPatientContext)

  const theme = useMemo(() => createTheme(themeSettings), []);

  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2)
  }

  const getAllPatients = async () => {
    const response = await PatientService.findAll()
    const scenarioPatient = await PatientService.findByNoadmsip(3563)

    if(response && scenarioPatient)
      response.map((patient: IPatient) => addPatient(patient))
      console.log('Patients in APP :', patients)
      setCurrentPatient(scenarioPatient)
      console.log('Patients in APP :', currentPatient)
    return response
  }

  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    initialData: [{
        noadmsip: 3563,
        firstname: 'NA',
        lastname: 'NA',
        dateofbirth: 'NA',
        gender: 'M',
        lifetimenumber: 0,
        weight: 0.0,
        idealweight: 0.0,
        height: 0.0,
        primarydiagnosis: 'NA',
        lastloadingtime: undefined,
    }] as IPatient[],
  })


  if (patientsQuery.isLoading) {
    console.log('isLoading')
    return <h1>Loading patients data...</h1>
  }
    
  if (patientsQuery.isError) {
    console.log(patientsQuery.error)
    return <pre>{formatResponse(patientsQuery.error)}</pre>
  }

  return (
      <div className="app">
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="0.5rem">
          <AuthenticationProvider >
            <PatientsProvider>
            <CurrentPatientProvider>
              <Routes />
            </CurrentPatientProvider>
            </PatientsProvider>
          </AuthenticationProvider >
          </Box>
        </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;



