import { Grid } from '@mui/material'
import PatientRecordZone from '@/dashboards/brain/PatientRecordZone'
import SideBarZone from '@/dashboards/brain/SideBarZone'
import AdherenceZone from '@/dashboards/brain/AdherenceZone'
import Navbar from '@/dashboards/brain/navbar'
import Clock from '@/components/Clock'

const BrainDashboard = () => {
  return (
    <>
      <Grid 
          container
          direction="row"
          alignItems="center" 
          spacing={1}
      >
        <Grid item xs={12}>
          {/* <Clock /> */}
        </Grid>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <PatientRecordZone />
        </Grid>
        <Grid container item xs={true}>
          <Grid item>
            <SideBarZone />
          </Grid>
          <Grid item alignItems="center" xs={true} sx={{ flexGrow: 1 }}>
            <AdherenceZone />
          </Grid>
        </Grid>     
      </Grid>
    </>
  )
}

export default BrainDashboard



