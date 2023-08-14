import { useEffect, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import Routes from "@/Routes"

import { AuthenticationProvider } from "@/contexts/AuthenticationContext";
import { DeviationScoreProvider } from "@/contexts/DeviationScoreContext";

import { usePatients } from "@/contexts/PatientsContext";
import { usePatient } from "@/contexts/CurrentPatientContext";
import { KpisDataProvider } from "./contexts/KpisContext";

const App = () => {
  const { status, error } = usePatients()
  const { currentPatient, setCurrentPatient } = usePatient()

  const theme = useMemo(() => createTheme(themeSettings), [])

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
      <div className="app">
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="0.5rem">
          <AuthenticationProvider >
            <KpisDataProvider>
              <DeviationScoreProvider>
                <Routes />
              </DeviationScoreProvider>
            </KpisDataProvider>
          </AuthenticationProvider >
          </Box>
        </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;



