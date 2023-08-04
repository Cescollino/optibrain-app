import { Grid } from '@mui/material';
import PatientRecordZone from './PatientRecordZone';
import SideBar from './SideBar';
import AdherenceZone from './AdherenceZone';
import Navbar from '../navbar';
import { IPatient } from '@/state/types';
import Clock from '@/components/Clock';

const Dashboard = () => {
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
            <SideBar />
          </Grid>
          <Grid item alignItems="center" xs={true} sx={{flexGrow: 1}}>
            <AdherenceZone />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;



