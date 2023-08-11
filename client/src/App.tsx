import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";

import { AuthenticationProvider } from "@/contexts/AuthenticationContext";
import { DeviationScoreProvider } from "./contexts/DeviationScoreContext";
import Routes from "@/Routes"

import PatientService from "@/services/PatientService";
import { usePatients } from "@/contexts/PatientsContext";
import { usePatient } from "@/contexts/CurrentPatientContext";

const App: React.FC = () => {
  const { patients, addPatients } = usePatients()
 
  const noadmsip = 3563  /* Noadmsip : Numéro d'admission soins intensifs pédiatriques */
  const { setCurrentPatient } = usePatient()

  const theme = useMemo(() => createTheme(themeSettings), [])

  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2)
  }

  async function getAllPatients() {
    const patientsFetched = await PatientService.findAll()
    addPatients(patientsFetched)

    return patientsFetched
  }

  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  })

  if (patientsQuery.isLoading) {
    console.log('isLoading')
    return <h1>Loading patients data...</h1>
  }
    
  if (patientsQuery.isError) {
    console.log(patientsQuery.error)
    return <pre>{formatResponse(patientsQuery.error)}</pre>
  }

  const scenarioPatient = patients.find( patient => patient.noadmsip === noadmsip )

  if (scenarioPatient) {
    setCurrentPatient(scenarioPatient)
  }
 
  return (
      <div className="app">
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="0.5rem">
          <AuthenticationProvider >
            <DeviationScoreProvider>
              <Routes />
            </DeviationScoreProvider>
          </AuthenticationProvider >
          </Box>
        </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;



