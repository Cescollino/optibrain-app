import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { themeSettings } from "@/theme";
import Routes from "@/Routes"
import IPatientData from "@/types/Patient";
import { CurrentPatientProvider } from "@/contexts/CurrentPatientContext";
import PatientDataService from "@/services/PatientService";

const App: React.FC = () => {

  /* Noadmsip : Numéro d'admission soins intensifs pédiatriques */
  const [ isFeching, setIsFetching ] = useState(true);
  
  const [patients, setPatients] = useState<Array<IPatientData>>([]);

  useEffect(() => {
    retrievePatients();
  }, []);

  const retrievePatients = () => {
    PatientDataService.getAll()
      .then((response: any) => {
        setPatients(response.data);
        console.log('Fetched all patients in database :', response.data);
      })
      .catch((e: Error) => {
        console.log('Error when fetching patients', e);
      });
  };

  const refreshList = () => {
    retrievePatients();
  };

  const removeAllPatients = () => {
    PatientDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

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
