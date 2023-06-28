import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, IconButton, Box, TableHead } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import InfoIcon from '@mui/icons-material/Info';

const PatientsRecordTable = () => {
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
      status: "Stable",
    },
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead />
        <TableBody>
          {PatientsRecordData.map((patient) => (
            <TableRow key={patient.id} sx={{ '& > *': { border: 'none', margin: 2, alignContent: "center" } }}>
              <TableCell sx={{ color: 'white' }}>#{patient.id}</TableCell>
              <TableCell sx={{ color: 'white' }}>{patient.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{patient.age}</TableCell>
              <TableCell sx={{ color: 'white' }}>{patient.weight}</TableCell>
              <TableCell sx={{ color: 'white' }}>J{patient.numberOfStayDays}</TableCell>
              <TableCell sx={{ color: 'white' }}>{patient.diagnosis}</TableCell>
              <TableCell sx={{ color: 'white' }}>{patient.scanType}
                <IconButton>
                <InfoIcon sx={{ color: 'white'}} />
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>{patient.affectedSystems.join(', ')}</TableCell>
              <TableCell sx={{ color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircleIcon sx={{ marginRight: '0.2rem', width: '12px', height: '12px' }} />
                  <Typography>{patient.status}</Typography>
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
