import { MouseEvent, KeyboardEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LogoutIcon from '@mui/icons-material/Logout'

import DashboardBox from '@/components/DashboardBox'
import PatientsRecordList from '@/components/navbar/PatientListTableGrid'
import SearchPatientBar from '@/components/navbar/SearchPatientBar'
import SquarePatientStateCount from '@/components/navbar/SquarePatientStateCount'
import { PatientStatus } from '@/state/patientState'

const NavBarZone = () => {
  const [isOpen, setIsOpenPatientList] = useState(false)

  const togglePatientList = (open: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) { return }
      setIsOpenPatientList(open)
  }

  return (
    <DashboardBox 
      sx={{
        display: 'flex',
        growFlex: 1,
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
      }}
      >
        <DashboardBox display='inline-flex' alignItems="center" sx={{ justifyContent: 'space-between', padding: '1rem', flewWrap: 'wrap', boxShadow: 'none'}}>
          <Box display="flex" alignItems="center" gap="0.5rem">
            <SearchPatientBar />
          </Box>
          {/* Mes patients */}
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Typography variant="h4" fontSize="16px" sx={{ marginRight: '0.5rem', color: 'white' }}>
              Mes patients
            </Typography>
            <Box display='inline-flex' gap="0.3rem">
            {/* TODO : Hardcoded values, needs a PatientStatus context */}
            <SquarePatientStateCount status={PatientStatus.STABLE} count={10} />
            <SquarePatientStateCount status={PatientStatus.WATCH} count={8} />
            <SquarePatientStateCount status={PatientStatus.CRITICAL} count={1} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box gap="3rem" sx={{ cursor: 'pointer', marginRight: '5rem' }} >
            <Button onClick={togglePatientList(!isOpen)} role="presentation" onKeyDown={togglePatientList(false)}>
              <KeyboardArrowDownIcon sx={{ fontSize: '28px', color: 'white', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </Button>
            </Box>
            <Box sx={{ '&:hover': { color: 'white' }, marginRight: '1rem' }}>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'inherit' }}>
                <AccountCircleIcon sx={{ fontSize: '28px' }} />
              </Link>
            </Box>
            <Box sx={{ '&:hover': { color: 'white' } }}>
              <Link to="/logout" style={{ color: 'white', textDecoration: 'inherit' }}>
                {/* TODO : implement the logout logic */}
                <LogoutIcon sx={{ fontSize: '28px' }} />
              </Link>
            </Box>
          </Box>
        </DashboardBox>
        {isOpen && (
        <DashboardBox sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
          <PatientsRecordList /> 
        </DashboardBox>
        )}
    </DashboardBox>
  )
}

export default NavBarZone