import { Grid } from '@mui/material'
import PatientRecordZone from '@/dashboards/brain/PatientRecordZone'
import SideBar from './SideBar'
import AdherenceZone from './AdherenceZone'
import Navbar from '../../components/navbar'
import Clock from '@/components/Clock'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
            {/* <Navbar /> */}
          </Grid>
          <Grid item xs={12}>
            {/* <PatientRecordZone /> */}
          </Grid>
          <Grid container item xs={true}>
            <Grid item>
              <SideBar />
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



