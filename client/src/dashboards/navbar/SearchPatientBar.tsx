import { Autocomplete, Box, InputBase, TextField, Fab, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IPatientData from '@/types/Patient';
import { useContext, useState } from 'react';
import { CurrentPatientContext } from '@/contexts/CurrentPatientContext';

type Props = {
  patients: Array<IPatientData>
}

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiTextField-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(0.5em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchPatientBar= ({ patients }: Props) => {
    const navigate = useNavigate();
    
    const { currentPatient, setCurrentPatient } = useContext(CurrentPatientContext)
    const initialPatientFullName: string = `${currentPatient.firstName} ${currentPatient.lastName}`;

    const [value, setValue] = useState<string | null>(initialPatientFullName);
    const [inputValue, setInputValue] = useState('');

    const { palette } = useTheme();
    return (
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Search>
                <Fab 
                  sx={{  
                    backgroundColor: palette.primary.dark, 
                    borderRadius: "100px", 
                    '&:hover': { backgroundColor: palette.primary.light },
                    width: '36px',
                    height: '36px',
                  }} 
                  aria-label="search patient"
                >
                  <PersonSearchIcon sx={{ fontSize: "24px", color: 'white' }} />
                </Fab>
                <Autocomplete
                  value={value}
                  onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                    setCurrentPatient(currentPatient);
                    navigate('/:noadmsip')
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={patients.map((patient) => `${patient.firstName} ${patient.lastName}`)}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      label="nom du patient"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
            </Search>
      </Box>
    );
}

export default SearchPatientBar;