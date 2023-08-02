import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { useContext, useMemo } from "react";
import { KpiProvider } from "@/contexts/KpisDataContext";
import { PatientContext, PatientProvider } from "@/contexts/PatientContext"
import { themeSettings } from "@/theme";
import Routes from "@/Routes"

function App() {

  const { patient } = useContext(PatientContext)
  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="0.5rem">
            <AuthenticationProvider>
               <PatientProvider>
                <KpiProvider patient={patient}>
                  <Routes patient={patient} />
                </KpiProvider>
              </PatientProvider>
            </AuthenticationProvider >
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;
