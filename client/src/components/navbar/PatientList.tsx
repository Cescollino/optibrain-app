import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material'
import { MouseEvent, KeyboardEvent, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PatientListTableGrid from '@/components/navbar/PatientListTableGrid'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchPatientBar from './SearchPatientBar'
import DashboardBox from '@/components/DashboardBox'
import SquarePatientStateCount from './SquarePatientStateCount'

import { useTheme } from '@mui/material/styles'

const PatientsList = () => {
  const { palette } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) { return }
      setIsOpen(open)
    }
 
  const listPatients = () => (
    <Box
      sx={{ width: 'auto',  backgroundColor: palette.primary.main, border: 'none' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <PatientListTableGrid />
    </Box>
  )

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
          {!isOpen && (
          <Box display="flex" alignItems="center">
            <Link to="/" style={{ color: 'white', textDecoration: 'inherit', display: 'flex', alignItems: 'center' }}>
              <SearchPatientBar />
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
                <LogoutIcon sx={{ fontSize: '28px' }} />
              </Link>
            </Box>
          </Box>
        </DashboardBox>
          </Toolbar>
        </AppBar>
        <Drawer sx={{ backgroundColor: palette.primary.main }} anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
          {listPatients()}
        </Drawer>
    </>
  )
}

export default PatientsList
