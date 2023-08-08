import { Grid } from '@mui/material';
import PatientRecordZone from '@/dashboards/brain/PatientRecordZone';
import SideBar from './SideBar';
import AdherenceZone from './AdherenceZone';
import Navbar from '../navbar';
import IPatient from '@/types/Patient';
import Clock from '@/components/Clock';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type Props = {
  patients: IPatient[]
}

const BrainDashboard = ({ patients }: Props) => {
  const { noadmsip } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (noadmsip)
      navigate('/:noadmsip')
  }, [noadmsip]);

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
            <Navbar patients={patients} />
          </Grid>
          <Grid item xs={12}>
            <PatientRecordZone patients={patients}/>
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
  );
};

export default BrainDashboard;



