import { MouseEvent, KeyboardEvent, useState, ChangeEvent, useEffect } from 'react';
import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PatientRecordsList from '@/components/patientRecord/PatientRecordsList';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchPatientBar from './SearchPatientBar';
import DashboardBox from '@/components/DashboardBox';
import SquarePatientStateCount from './SquarePatientStateCount';
import { PatientStatus } from '@/state/patientState';
import { useTheme } from '@mui/material/styles'
import { useParams, useNavigate } from 'react-router-dom';

import PatientDataService from "@/services/PatientService";
import IPatient from "@/types/Patient";

type Props = {
  patients: Array<IPatient>
}

const PatientsList = ({ patients }: Props) => {

  const [state, setState] = useState(false);

  const { palette } = useTheme();

  const toggleDrawer = (open: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) { return; }
      setState(open);
    };
 
  const listPatients = () => (
    <Box
      sx={{ width: 'auto',  backgroundColor: palette.primary.main, border: 'none' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <PatientRecordsList patients={patients} />
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1, backgroundColor: 'transparent' }}>
        <Toolbar>
        <DashboardBox 
        sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              padding: '1rem',
              flewWrap: 'wrap',
        }}
        >
          {!state && patients.length > 0 && (
          <Box display="flex" alignItems="center">
            <Link to="/" style={{ color: 'white', textDecoration: 'inherit', display: 'flex', alignItems: 'center' }}>
              <SearchPatientBar patients={patients} />
            </Link>
          </Box>
          )}

          <Box display="flex" alignItems="center" gap="0.5rem" >
            <Typography variant="h4" fontSize="16px" sx={{ marginRight: '0.5rem', color: 'white' }}>
              Mes patients
            </Typography>
            <Box display='inline-flex' gap="0.3rem">
            <SquarePatientStateCount status={palette.greenStatus.main} count={10} />
            <SquarePatientStateCount status={palette.orangeStatus.main} count={8} />
            <SquarePatientStateCount status={palette.redStatus.main} count={1} />
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <Box gap="3rem" sx={{ cursor: 'pointer', marginRight: '5rem' }} >
            <Button onClick={toggleDrawer(true)}>
              <KeyboardArrowDownIcon sx={{ fontSize: '28px', color: 'white', transform: state ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </Button>
            </Box>
            <Box sx={{ '&:hover': { color: 'white' }, marginRight: '1rem' }}>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'inherit' }}>
                <AccountCircleIcon sx={{ fontSize: '28px' }} />
              </Link>
            </Box>
            <Box sx={{ '&:hover': { color: 'white' } }}>
              <Link to="/logout" style={{ color: 'white', textDecoration: 'inherit' }}>
                <LogoutIcon sx={{ fontSize: '28px' }} />
              </Link>
            </Box>
          </Box>
        </DashboardBox>
          </Toolbar>
        </AppBar>
        {patients.length > 0 && (
          <Drawer sx={{ backgroundColor: palette.primary.main }} anchor="top" open={state} onClose={toggleDrawer(false)}>
            {listPatients()}
          </Drawer>
        )}
    </>
  );
}

export default PatientsList;
