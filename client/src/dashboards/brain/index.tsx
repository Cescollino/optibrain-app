import { Grid } from '@mui/material'
import PatientRecordZone from '@/dashboards/brain/PatientRecordZone'
import SideBarZone from '@/dashboards/brain/SideBarZone'
import AdherenceZone from '@/dashboards/brain/AdherenceZone'
import NavbarZone from '@/dashboards/brain/NavBarZone'

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
          <NavbarZone />
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



