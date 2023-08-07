import { Grid } from '@mui/material';
import PatientRecordZone from '@/dashboards/brain/PatientRecordZone';
import SideBar from './SideBar';
import AdherenceZone from './AdherenceZone';
import Navbar from '../navbar';
import IPatientData from '@/types/Patient';
import Clock from '@/components/Clock';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurrentPatientContext } from '@/contexts/CurrentPatientContext';

type Props = {
  patients: Array<IPatientData>
}

const BrainDashboard = ({ patients }: Props) => {
  const { noadmsip } = useParams();
  const navigate = useNavigate();

  const { currentPatient } = useContext(CurrentPatientContext)

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
          {currentPatient && (
            <>
              <Grid item xs={12}>
                <PatientRecordZone />
              </Grid>
              <Grid container item xs={true}>
                <Grid item>
                  <SideBar />
                </Grid>
                <Grid item alignItems="center" xs={true} sx={{ flexGrow: 1 }}>
                  <AdherenceZone />
                </Grid>
              </Grid>
            </>      
          )}
      </Grid>
    </>
  );
};

export default BrainDashboard;



