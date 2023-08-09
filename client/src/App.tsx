import React, { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";

import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { CurrentPatientProvider } from "@/contexts/CurrentPatientContext";
import Routes from "@/Routes"

import IPatient from "@/types/Patient";
import PatientService from "@/services/PatientService";

/* Noadmsip : Numéro d'admission soins intensifs pédiatriques */

const App: React.FC = () => {
  const [patients, setPatients] = useState<IPatient[]>([{ noadmsip: 0, firstname: 'NA', lastname: 'NA', dateofbirth: 'NA', gender: 'M', lifetimenumber: 0, weight: 0.0, idealweight: 0.0, height: 0.0, primarydiagnosis: 'NA', lastloadingtime: undefined }] as IPatient[])
  const theme = useMemo(() => createTheme(themeSettings), []);

  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2)
  }

  // const getAllPatients = async () => {
  //   const response = await PatientService.findAll()
  //   if(response)
  //     setPatients(response)
  //   return response
  // }

  // const patientsQuery = useQuery({
  //   queryKey: ["patients"],
  //   queryFn: getAllPatients,
  //   initialData: [{
  //       noadmsip: 3563,
  //       firstname: 'NA',
  //       lastname: 'NA',
  //       dataofbirth: 'NA',
  //       gender: 'M',
  //       lifetimenumber: 0,
  //       weight: 0.0,
  //       idealweight: 0.0,
  //       height: 0.0,
  //       primarydiagnosis: 'NA',
  //       lastloadingtime: undefined,
  //   }] as IPatient[],
  // })


  // if (patientsQuery.isLoading) {
  //   console.log('isLoading')
  //   return <h1>Loading patients data...</h1>
  // }
    
  // if (patientsQuery.isError) {
  //   console.log(patientsQuery.error)
  //   return <pre>{formatResponse(patientsQuery.error)}</pre>
  // }

  return (
      <div className="app">
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="0.5rem">
          <AuthenticationProvider >
            <CurrentPatientProvider>
              <Routes patients={patients} />
            </CurrentPatientProvider>
          </AuthenticationProvider >
          </Box>
        </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;



