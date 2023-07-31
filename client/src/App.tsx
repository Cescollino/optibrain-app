import { createTheme } from "@mui/material/styles";
import { useContext, useEffect, useMemo, useState } from "react";
import { themeSettings } from "@/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "@/contexts/AuthenticationContext"
import Routes from "@/Routes"
import { PatientData } from '@/state/types';
import { PATIENT } from '@/services/kpiService';

function App() {
  
  const defaultPatient: PatientData =  { 
    noadmsip: 0,
    firstName: 'NA',
    lastName: 'NA',
    dateOfBirth: 'NA',
    gender: 'NA',
    weight: 0.0,
    idealWeight: 0.0,
    height: 0.0,
    primaryDiagnosis: 'NA',
    lastLoadingTime: 0,
  }
  const noadmsip = 3563;

  const [patient, setPatient] = useState<PatientData>(defaultPatient);

  useEffect(()=> {
    PATIENT.get(noadmsip)
      .then((data) => { 
        setPatient(data);
      })
      .catch((err) => {
        console.log(err);
      });
      return () => {};
  }, [patient.noadmsip]);

  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="0.5rem">
              <AuthenticationProvider>
                <Routes patient={patient}/>
              </AuthenticationProvider >
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;