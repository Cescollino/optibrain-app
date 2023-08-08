import { Autocomplete, Box, InputBase, TextField, Fab, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IPatient from '@/types/Patient';
import { useContext, useState } from 'react';
import { CurrentPatientContext } from '@/contexts/CurrentPatientContext';

type Props = {
  patients: IPatient[]
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
    const navigate = useNavigate()

    const [value, setValue] = useState<IPatient | null>(null)
    const [selectedPatient, setSelectedPatient] = useState<number | null >(null)
    const [inputValue, setInputValue] = useState('')

    const { palette } = useTheme()
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'nowrap', width: '100%'  }}>
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
                  size='small'
                  value={value}
                  onChange={(event: any, newValue: IPatient | null) => {
                    setValue(newValue);
                    if(newValue) {
                      console.log('noadmsip selectionné: ', newValue.noadmsip)
                      setSelectedPatient(newValue.noadmsip)
                      navigate(`/:${selectedPatient}`)
                    }
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={patients as readonly IPatient[]}
                  getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
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