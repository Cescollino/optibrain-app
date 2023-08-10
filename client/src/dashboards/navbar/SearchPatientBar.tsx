import { Autocomplete, Box, InputBase, TextField, Fab, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IPatient from '@/types/Patient';
import { useContext, useState } from 'react';
import { CurrentPatientContext } from '@/contexts/CurrentPatientContext';
import { PatientsContext } from '@/contexts/PatientsContext';

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
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchPatientBar= () => {
    const { patients } = useContext(PatientsContext)
    const { palette } = useTheme()
    const navigate = useNavigate()

    const [value, setValue] = useState<IPatient | null>(null)
    const [inputValue, setInputValue] = useState('')

    const handleSelect = (noadmsip: number) => {
      navigate(`/dashboard/brain/${noadmsip}`)
    }

    return (
        <Search sx={{ display: 'inline-flex', placeItems: 'center'}}>
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
            <PersonSearchIcon sx={{ fontSize: "24px", color: 'white'}} />
          </Fab>

            <Autocomplete
              value={value}
              onChange={(event: any, newValue: IPatient | null) => {
                setValue(newValue);
                if(newValue) {
                  console.log('noadmsip selectionné: ', newValue.noadmsip)
                  handleSelect(newValue.noadmsip)
                }
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
 
              options={patients as readonly IPatient[]}
              getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    placeholder: 'nom patient',
                  }}
                />
              )}
            />

          </Search>
           
    );
}

export default SearchPatientBar;