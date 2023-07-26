import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "@/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthentificationContext"
import Routes from "@/Routes"

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
      <div className="app">
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box width="100%" height="100%" padding="0.5rem">
                <Routes />
              </Box>
              </ThemeProvider>
          </AuthProvider >
        </BrowserRouter>
      </div>
  )
}

export default App
