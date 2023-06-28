import DashboardBox from "@/components/DashboardBox";
import { Fab, Typography, useTheme} from "@mui/material";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { StatusColor } from "@/types/patientState";
import NeurologicalStateBar from "@/components/patientRecord/NeurologicalStateBar";
import KpiCircularProgressBar from "@/components/kpi/KpiCircularProgressBar";
import GlasgowScoresBar from "@/components/glasgowScore/GlasgowScoresBar";
import PatientRecordBox from "@/components/patientRecord/PatientRecordBox";
import PatientRecordHeader from "@/components/patientRecord/PatientRecordHeader";
import { useState } from "react";
import PatientRecordTendenciesChart from "@/components/patientRecord/PatientRecordTendenciesChart";
import { Data } from "@/data/pupilleDroite";
import GlobalAdherenceChart from "@/components/patientRecord/GlobalAdherenceChart";
import GlasgowScoreChart from "@/components/patientRecord/GlasgowScoreChart";
import NeurologicalStateChart from "@/components/patientRecord/NeurologicalStateChart";




type PatientGraphicsData = {
  time: string; 
  score: number | string; 
}

const PatientRecordZone = () => {
  const globalAdherenceData: { day: string; score: number; }[] = [
    { day: "J0", score: 40 },
    { day: "J01", score: 40 },
    { day: "J02",  score: 40 },
    { day: "J03",  score: 60 },
    { day: "J04",  score: 60 },
    { day: "J05",  score: 60 },
    { day: "J06",  score: 60 },
    { day: "J07",  score: 80 },
    { day: "J08",  score: 80 },
    { day: "J09", score: 80 },
    { day: "J10",  score: 80 },
  ];
  
  const neurologicalStateData: { time: string; state: number; }[] = [
      { time: "4:00", state: 2 },
      { time: '4:30', state: 2 },
      { time: '5:00', state: 2 },
      { time: '5:30', state: 2 },
      { time: '6:30', state: 2 },
      { time: '7:00', state: 1 },
      { time: '7:30', state: 5 },
      { time: '8:00', state: 2 },
  ];

  const glasgowScoreData: { day: string; score: number; }[] = [
    { day: "", score: 8 },
    { day: "J01", score: 8 },
    { day: "J02",  score: 8 },
    { day: "J03",  score: 10 },
    { day: "J04",  score: 10 },
    { day: "J05",  score: 10 },
    { day: "J06",  score: 10 },
    { day: "J07",  score: 14 },
    { day: "J08",  score: 14 },
    { day: "J09", score: 14 },
    { day: "J10",  score: 14 },
  ];


  const { palette } = useTheme();
  
  const [scanImageVisible, setScanImageVisible] = useState(false);
  const [tendenciesGraphVisible, setTendenciesGraphVisible] = useState(false);

  const updateVisualDisplay = (option: string) => {
    switch(option) {
      case "scan":
        setScanImageVisible(!scanImageVisible);
        break;
      case "tendencies":
        setTendenciesGraphVisible(!tendenciesGraphVisible);
        break;
      default:
        break;
    }
  };

  return (
      <DashboardBox 
        sx={{
          display: 'flex',
          flewWrap: 'wrap',
          minHeight: '166px',

          justifyContent: 'space-between',
          padding: '2rem',
        }}
      >
        {/* First item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Alex Dave (M)" />}
          content={
            <>
              <Typography variant="h5" fontSize="14px">
                Trauma crânien sévère
              </Typography>
              <Typography variant="h5" fontSize="14px">
                Âge 4a 4m 12j
              </Typography>
              <Typography variant="h5" fontSize="14px">
                Poids: 12.300
              </Typography>
              <Typography variant="h5" fontSize="14px">
                #Jours USIP: J4
              </Typography>
            </>
          }
          visualContent={scanImageVisible && (<img src="src/assets/CT scan.png" alt="scan" />)}
          fab={
            <Fab
              variant="extended"
              aria-label="scan"
              sx={{
                width: "165px",
                height: "27px",
                backgroundColor: palette.black[900],
                textTransform: "none",
              }}
              onClick={() => updateVisualDisplay('scan')}
            >
            <InsertChartIcon sx={{ fontSize: "22px", color: "white" }} />
            <Typography sx={{ fontSize: "12px", ml: 1 }} variant="h4">
              {scanImageVisible ? "Fermer CT" : "Accès CT"}
            </Typography>
          </Fab>}
          />
      
        {/* Second item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Adhérence global" indicator="70%" indicatorColor={StatusColor.RED} />}
          content={!tendenciesGraphVisible && <KpiCircularProgressBar score={90} arrow="true" />}
          visualContent={tendenciesGraphVisible && <GlobalAdherenceChart data={globalAdherenceData} />}
          fab={
          <Fab
            variant="extended"
            aria-label="scan"
            sx={{
              width: "165px",
              height: "27px",
              backgroundColor: palette.black[900],
              textTransform: "none",
            }}
          onClick={() => updateVisualDisplay('tendencies')}
          >
          <InsertChartIcon sx={{ fontSize: "22px", color: "white" }} />
          <Typography sx={{ fontSize: "12px", ml: 1 }} variant="h4">
            {tendenciesGraphVisible ? "Fermer tendances": "Accès tendances"}
          </Typography>
        </Fab>}
        />
      
        {/* Third item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="État neurologique" indicator="Hyperthémie" indicatorColor={StatusColor.ORANGE} />}
          content={!tendenciesGraphVisible && <NeurologicalStateBar score={80} />}
          visualContent={tendenciesGraphVisible && <NeurologicalStateChart data={neurologicalStateData} />}
          
        />
        {/* Fourth item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Score de Glasgow" indicator="grave" indicatorColor={StatusColor.RED} />}
          content={!tendenciesGraphVisible && <GlasgowScoresBar score={25} />}
          visualContent={tendenciesGraphVisible && <GlasgowScoreChart data={glasgowScoreData} />}
        />
      </DashboardBox>
  )
}

export default PatientRecordZone;