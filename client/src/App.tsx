import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { useContext, useEffect, useMemo, useState } from "react";
import { KpiProvider } from "@/contexts/KpisDataContext";
import { PatientProvider } from "@/contexts/PatientContext"
import { themeSettings } from "@/theme";
import Routes from "@/Routes"
import { PATIENTS } from "@/api/kpiService";
import { KpiData, PatientData, PatientRecordData } from "@/state/types";
import { PatientsRecordContext } from "@/contexts/PatientsRecordContext";
import { PatientStatus, StatusColor } from '@/types/patientState'

function App() {

  /* Noadmsip : Numéro d'admission soins intensifs pédiatriques */
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [patientsData, setPatientsData] = useState<PatientData[] | null>(null);
  const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const { patientsRecord, setRecords } = useContext(PatientsRecordContext);

  // Fetch all the patients record from cache once
  useEffect(() => {
    const fetchAllPatientRecords = async () => {
      try {
          const data = await PATIENTS.getAll();
          setPatientsData(data);
          patientsData?.map((data) => (
            setRecords(
              [...patientsRecord, { 
                patientData: data,
                scans: 'CT scan', 
                stayDays: 7, 
                affectedSystems: ['Brain'],  
                status: { 
                  state: PatientStatus.CRITICAL, 
                  color: StatusColor.RED 
                } 
              } as PatientRecordData ]
            )
          ));
          console.log('Fetched patients data:', data);
      } catch (err) {
        console.log('Error fetching patients records data:', err);
      }
    };

    fetchAllPatientRecords();
  }, []);

  // Fetch the key point indicators from the cache database
  useEffect(() => {
    const fetchKpiData = async () => {
        try {
            if (selectedPatient) {
                const kpiData = await PATIENTS.getAllKpis(selectedPatient.noadmsip);
                setKpiData(kpiData);
                console.log('Fetched kpis data:', kpiData);
            }   
        } catch (err) {
        console.error('Error fetching kpiData:', err);
        }
    };

    fetchKpiData();
  }, [selectedPatient]);

  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="0.5rem">
            <AuthenticationProvider>
              <PatientProvider>
                <Routes />
              </PatientProvider>
            </AuthenticationProvider >
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;
