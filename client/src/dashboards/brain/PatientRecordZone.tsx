import DashboardBox from "@/components/DashboardBox"
import { Fab, Grid, Typography, useTheme } from "@mui/material"
import InsertChartIcon from '@mui/icons-material/InsertChart'
import { useState } from "react"
import { styled } from "@mui/system"

import PatientRecordBox from "@/components/patientRecord/PatientRecordBox"
import PatientRecordHeader from "@/components/patientRecord/PatientRecordHeader"
import NeurologicalStateBar from "@/components/patientRecord/NeurologicalStateBar"
import KpiCircularProgressBar from "@/components/kpi/KpiCircularProgressBar"
import GlasgowScoresBar from "@/components/patientRecord/GlasgowScoresBar"
import GlobalAdherenceChart from "@/components/patientRecord/GlobalAdherenceChart"
import GlasgowScoreChart from "@/components/patientRecord/GlasgowScoreChart"
import NeurologicalStateChart from "@/components/patientRecord/NeurologicalStateChart"

import { dateOfBirthToAge } from "@/utils/ageFormatting"
import { useCurrentPatient } from "@/contexts/CurrentPatientContext"
import { DEFAULT_GLOBAL_ADHERENCE_CHART_DATA, DEFAULT_NEURO_STATE_CHART_DATA, DEFAULT_GLASGOW_CHART_DATA } from "@/utils/initialData"
import scanImage from '@/assets/images/scan.png'


const ScanImageContainer = styled(Grid) (
  {
    display: "flex",  
    flexDirection: "column",
    flexGrow: 1, 
    padding: 0, 
    margin: 0,
    width: 189,
    height: 196,
    backgroundImage: `url(${scanImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
)

const PatientRecordZone = () => {
  const { palette } = useTheme()
  const { currentPatient } = useCurrentPatient()

  let patientAge: string | undefined = undefined

  if(currentPatient) {
    patientAge = dateOfBirthToAge(currentPatient.dateofbirth)
  }

  const [isVisualContentDisplayed, setIsVisualContentDisplayed] = useState<boolean>(false)

  const handleVisualContentClick = () => {
    setIsVisualContentDisplayed(!isVisualContentDisplayed)
  }

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
          header={<PatientRecordHeader title={`${currentPatient?.firstname} ${currentPatient?.lastname} (${currentPatient?.gender})`} />}
          content={
            <>
              <Typography variant="h5" fontSize="14px">
                Trauma crânien sévère
              </Typography>
              <Typography variant="h5" fontSize="14px">
                Âge: {patientAge}
              </Typography>
              <Typography variant="h5" fontSize="14px">
                Poids: {currentPatient?.weight} kg
              </Typography>
              <Typography variant="h5" fontSize="14px">
                #Jours USIP: J4
              </Typography>
            </>
          }
          visualContent={isVisualContentDisplayed && (<ScanImageContainer />)}
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
              onClick={handleVisualContentClick}
            >
            <InsertChartIcon sx={{ fontSize: "22px", color: "white" }} />
            <Typography sx={{ fontSize: "12px", ml: 1 }} variant="h4">
              {isVisualContentDisplayed ? "Fermer details" : "Accès détails"}
            </Typography>
          </Fab>}
          />
      
        {/* Global adherence */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Adhérence global" indicator="70%" indicatorColor={palette.redStatus.main} />}
          content={!isVisualContentDisplayed && <KpiCircularProgressBar score={70} arrow="true" />}
          visualContent={isVisualContentDisplayed && <GlobalAdherenceChart data={DEFAULT_GLOBAL_ADHERENCE_CHART_DATA} />}
        />
      
        {/* Third item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="État neurologique" indicator="Hyperthémie" indicatorColor={palette.orangeStatus.main} />}
          content={!isVisualContentDisplayed && <NeurologicalStateBar score={80} />}
          visualContent={isVisualContentDisplayed && <NeurologicalStateChart data={DEFAULT_NEURO_STATE_CHART_DATA} />}
          
        />
        {/* Fourth item */}
        <PatientRecordBox
          header={<PatientRecordHeader title="Score de Glasgow" indicator="grave" indicatorColor={palette.redStatus.main} />}
          content={!isVisualContentDisplayed && <GlasgowScoresBar score={25} />}
          visualContent={isVisualContentDisplayed && <GlasgowScoreChart data={DEFAULT_GLASGOW_CHART_DATA} />}
        />
      </DashboardBox>
  )
}

export default PatientRecordZone