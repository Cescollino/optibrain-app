import DashboardBox from "@/components/DashboardBox";
import { Box, Fab, Grid, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NeurologicalStateBar from "@/components/patientRecord/NeurologicalStateBar";
import KpiCircularProgressBar from "@/components/kpi/KpiCircularProgressBar";
import GlasgowScoresBar from "@/components/glasgowScore/GlasgowScoresBar";
import PatientRecordBox from "@/components/patientRecord/PatientRecordBox";
import PatientRecordHeader from "@/components/patientRecord/PatientRecordHeader";
import { useContext, useEffect, useState } from "react";
import GlobalAdherenceChart from "@/components/patientRecord/GlobalAdherenceChart";
import GlasgowScoreChart from "@/components/patientRecord/GlasgowScoreChart";
import NeurologicalStateChart from "@/components/patientRecord/NeurologicalStateChart";
import { dateOfBirthToAge } from "@/utils/ageFormatting";

import IPatient from "@/types/Patient"
import IPatientRecordData  from "@/types/PatientRecord";
import PatientDataService from "@/api/services/PatientService";
import { useNavigate } from "react-router-dom";

import { useCurrentPatient } from "@/contexts/CurrentPatientContext";
import scanImage from '@/assets/images/scan.png';
import { useDeviationScore } from "@/contexts/DeviationScoreContext";
import { IDeviationKpiData } from "@/api/services/DeviationScoreService";
import { kpisGlobalScore } from "@/utils/globalScoreCalculator";



const ScanImageContainer = styled(Grid) (
  {
    display: "flex",  
    flexDirection: "column",
    flexGrow: 1, 
    padding: 0, 
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${scanImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
)


function getGlobalScore(scores: number[]) {
  const value = kpisGlobalScore(scores)

  console.log('DEVIATION SCORE : ', value)
  return value
}

const PatientRecordZone = () => {
  const { currentPatient } = useCurrentPatient()
  const { data: deviationData } = useDeviationScore()
  const scores: number[] = []
  const [ globalScore, updateGlobalScore ] = useState(0)

  useEffect(() => {
      // deviationData['PAm'].map((data, i) => scores.push(data[i].scofres))
      const score = getGlobalScore(scores)
      updateGlobalScore(score)
      console.log('GLOBAL !', globalScore)

  }, [deviationData])
    
  let patientAge: string | undefined = undefined
  if(currentPatient) {
    patientAge = dateOfBirthToAge(currentPatient.dateofbirth)
  }

  const globalAdherenceData: { day: string; score: number; }[] = [
    { day: "J0", score: 40 },
    { day: "J01", score: 40 },
    { day: "J02", score: 40 },
    { day: "J03", score: 60 },
    { day: "J04", score: 60 },
    { day: "J05", score: 60 },
    { day: "J06", score: 60 },
    { day: "J07", score: 80 },
    { day: "J08", score: 80 },
    { day: "J09", score: 80 },
    { day: "J10", score: 80 },
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
  ]

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
  ]

  const { palette } = useTheme()
  
  const [scanImageVisible, setScanImageVisible] = useState(false)
  const [tendenciesGraphVisible, setTendenciesGraphVisible] = useState(false)

  useEffect(() => {

  }, [scanImageVisible])

  useEffect(() => {

  }, [tendenciesGraphVisible])


  return (
      <DashboardBox 
        sx={{
          display: 'flex',
          flewWrap: 'wrap',
          minHeight: '166px',

          justifyContent: 'space-between',
          padding: '2rem',
          gap: 1,
        }}
      >
        {/* First item */}
        <PatientRecordBox
          header={<PatientRecordHeader title={`${currentPatient?.firstname} ${currentPatient?.lastname} (${currentPatient?.gender})`} />}
          content={
            <>
              <Typography variant="h5" fontSize="14px">
                Trauma crânien sévère
              </Typography>
              <Typography variant="h5" fontSize="14px">
                {patientAge}
              </Typography>
              <Typography variant="h5" fontSize="14px">
                Poids: {currentPatient?.weight} kg
              </Typography>
              <Typography variant="h5" fontSize="14px">
                #Jours USIP: J4
              </Typography>
            </>
          }
          visualContent={scanImageVisible && (<ScanImageContainer />)}
          fab={
            <Fab
              variant="extended"
              aria-label="scan"
              sx={{
                width: "165px",
                height: "27px",
                backgroundColor: palette.primary.dark,
                textTransform: "none",
              }}
              onClick={() => setScanImageVisible(!scanImageVisible)}
            >
            <InsertChartIcon sx={{ fontSize: "22px", color: "white" }} />
            <Typography sx={{ fontSize: "12px", ml: 1 }} variant="h4">
              {scanImageVisible ? "Fermer CT" : "Accès CT"}
            </Typography>
          </Fab>}
          />
      
        {/* Global adherence */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Adhérence global" indicator="70%" indicatorColor={palette.greenStatus.main} />}
          content={!tendenciesGraphVisible && <KpiCircularProgressBar score={globalScore} arrow="true" />}
          visualContent={tendenciesGraphVisible && <GlobalAdherenceChart data={globalAdherenceData} />}
          fab={
          <Fab
            variant="extended"
            aria-label="scan"
            sx={{
              width: "165px",
              height: "27px",
              backgroundColor: palette.primary.dark,
              textTransform: "none",
            }}
          onClick={() => setTendenciesGraphVisible(!tendenciesGraphVisible)}
          >
          <InsertChartIcon sx={{ fontSize: "22px", color: "white" }} />
          <Typography sx={{ fontSize: "12px", ml: 1 }} variant="h4">
            {tendenciesGraphVisible ? "Fermer tendances": "Accès tendances"}
          </Typography>
        </Fab>}
        />
      
        {/* Third item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="État neurologique" indicator="Hyperthémie" indicatorColor={palette.orangeStatus.main} />}
          content={!tendenciesGraphVisible && <NeurologicalStateBar score={80} />}
          visualContent={tendenciesGraphVisible && <NeurologicalStateChart data={neurologicalStateData} />}
          
        />
        {/* Fourth item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Score de Glasgow" indicator="grave" indicatorColor={palette.redStatus.main} />}
          content={!tendenciesGraphVisible && <GlasgowScoresBar score={25} />}
          visualContent={tendenciesGraphVisible && <GlasgowScoreChart data={glasgowScoreData} />}
        />
      </DashboardBox>
  )
}

export default PatientRecordZone;