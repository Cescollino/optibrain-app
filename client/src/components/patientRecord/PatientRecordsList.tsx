import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, IconButton, Box, TableHead } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles'
import { useContext } from 'react';
import { usePatients } from '@/contexts/PatientsContext';

const PatientRecordsList = () => {
  const { patients } = usePatients()
  const { palette } = useTheme()

  return (
    <TableContainer>
      <Table>
        <TableHead />
        <TableBody>
          {patients!.map((record) => (
            <TableRow key={record.noadmsip} >
              <TableCell sx={{ color: 'white', justifyContent: "center", textAlign: 'center', border: 'solid', borderRadius: '60px', borderColor: palette.orangeStatus.main }}>#{record.noadmsip}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.firstname} {record.lastname}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.dateofbirth}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.weight}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}><Typography>Junknown </Typography></TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.primarydiagnosis}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>
                <Typography>unknown scans</Typography>
                <IconButton>
                  <InfoIcon sx={{ color: 'white', border: 'none'}} />
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}><Typography>unknown affectedSystems</Typography></TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircleIcon sx={{ marginRight: '0.2rem', width: '12px', height: '12px' }} />
                  <Typography>unknown status</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatientRecordsList
