import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, IconButton, Box, TableHead } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles'
import { PatientsRecordContext } from '@/contexts/PatientsRecordContext';
import { useContext } from 'react';


const PatientsRecordTable = () => {
  const { patientsRecord } = useContext(PatientsRecordContext);
  const { palette } = useTheme();

  const PatientsRecordData = [
    {
      id: 0,
      name: 'Jean Tremblay',
      diagnosis: 'Trauma Crânien',
      age: '2a 2m 10j',
      weight: 10.400,
      numberOfStayDays: 3,
      scanType: 'CT scan',
      affectedSystems: ['Brain'],
      status: "Stable",
    },
    {
      id: 1,
      name: 'Philippe Roy',
      diagnosis: 'Trauma Crânien',
      age: '4a 4m 12j',
      weight: 12.300,
      numberOfStayDays: 3,
      scanType: 'CT scan',
      affectedSystems: ['Lungs', 'Kidney'],
      status: "Stable",
    },
    {
      id: 2,
      name: 'Alexa Girard',
      diagnosis: 'Pneumonie',
      age: '5a 3m 28j',
      weight: 23,
      numberOfStayDays: 18,
      scanType: 'CT scan',
      affectedSystems: ['Brain', 'Kidney'],
      status: "Critique",
    },

  ];


  return (
    <TableContainer>
      <Table>
        <TableHead />
        <TableBody>
          {patientsRecord.map((record) => (
            <TableRow key={record.patientData.noadmsip} >
              <TableCell sx={{ color: 'white', justifyContent: "center", textAlign: 'center', border: 'solid', borderRadius: '60px', borderColor: palette.orangeStatus.main }}>#{record.patientData.noadmsip}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.patientData.firstName}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.patientData.dateOfBirth}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.patientData.weight}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>J{record.stayDays}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.patientData.primaryDiagnosis}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.scans}
                <IconButton>
                <InfoIcon sx={{ color: 'white', border: 'none'}} />
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>{record.affectedSystems.join(', ')}</TableCell>
              <TableCell sx={{ color: 'white', border: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircleIcon sx={{ marginRight: '0.2rem', width: '12px', height: '12px' }} />
                  <Typography>{record.status.state}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientsRecordTable;
