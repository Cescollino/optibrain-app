import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "@/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/scenes/dashboard";
// import SystemsSidebar from "@/scenes/systems-sidebar";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="0.5rem">
              <Routes>
                <Route path="/" element={<Dashboard />}/>
                {/* <Route 
                  path="/brain" 
                  element={<SystemsSidebar />}/> */}
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App
