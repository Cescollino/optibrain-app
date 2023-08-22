import { Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Box, TableHead } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import InfoIcon from '@mui/icons-material/Info'
import { useTheme } from '@mui/material/styles'
import { usePatients } from '@/contexts/PatientsContext'
import BrainIcon from '@/components/icons/BrainIcon'
import { dateOfBirthToAge } from '@/utils/ageFormatting'


// TODO: Replace this with a real table, this is just a mockup
const PatientListTableGrid = () => {
  const { palette } = useTheme()
  const { patients } = usePatients()

  return (
    <TableContainer>
      <Table>
        <TableHead />
        <TableBody>
          {patients?.map((record) => (
            <TableRow key={record.noadmsip}>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'solid', borderColor: palette.orangeStatus.main }}>#{record.noadmsip}</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>{record.lastname}, {record.firstname} </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>{dateOfBirthToAge(record.dateofbirth)}</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>{record.weight}</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>J4</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>Trauma crânien</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>
                CT scans
                <IconButton>
                  <InfoIcon sx={{ color: 'white', textAlign: 'center', border: 'none'}} />
                </IconButton>
              </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}><BrainIcon color={palette.orangeStatus.main} opacity={1}/></TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', border: 'none' }}>
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                  <CircleIcon sx={{ marginRight: '0.2rem', width: '12px', height: '12px', color: palette.orangeStatus.main }} />
                  Surveiller
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatientListTableGrid
