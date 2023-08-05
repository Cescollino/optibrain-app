import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { themeSettings } from "@/theme";
import Routes from "@/Routes"
import { KpiData, IPatient, PatientRecordData } from "@/state/types";
import { PatientStatus, StatusColor } from '@/types/patientState'
import { getApi } from "./api/kpiService";
import axios, { AxiosError } from "axios";

function App() {

  /* Noadmsip : Numéro d'admission soins intensifs pédiatriques */
  const [ isFeching, setIsFetching ] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const [patientsData, setPatientsData] = useState<IPatient[]>([]);
  // const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const [patientRecords, setRecords] = useState<PatientRecordData[]>([]);

  const getData = () => getApi().then(
    (res) => {
      if (res.status === 200 && res.data) {
        setPatientsData(res.data)
        console.log(patientsData) 
      } else {
        console.log(res)
      }
  }
  )

  useEffect(() => {
    getData()
  }, []);

  // useEffect(() => {
  //   const records: PatientRecordData[] = patientsData.map((patient) => ({
  //     patient,
  //     scans: 'CT scan',
  //     stayDays: 7,
  //     affectedSystems: ['Brain'],
  //     status: {
  //       state: PatientStatus.CRITICAL,
  //       color: StatusColor.RED,
  //     },
  //   }) as PatientRecordData); 
  //   setRecords([...patientRecords, ...records]);
  //   console.log(patientRecords);
  // }, [patientsData]);

  // // Fetch the key point indicators from the cache database
  // useEffect(() => {
  //   const fetchKpiData = async () => {
  //       try {
  //           if (selectedPatient) {
  //               const kpiData = await PATIENTS.getAllKpis(selectedPatient.noadmsip);
  //               setKpiData(kpiData);
  //               console.log('Fetched kpis data:', kpiData);
  //           }   
  //       } catch (err) {
  //       console.error('Error fetching kpiData:', err);
  //       }
  //   };

  //   fetchKpiData();
  // }, [selectedPatient]);

  const theme = useMemo(() => createTheme(themeSettings), []);
  
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="0.5rem">
            <AuthenticationProvider>
                <Routes />
            </AuthenticationProvider >
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
  )
}

export default App;
