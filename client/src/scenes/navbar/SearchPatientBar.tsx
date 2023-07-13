import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Fab, useTheme } from '@mui/material';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
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


function SearchPatientBar() {
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
              <StyledInputBase
                placeholder="ex: Jean Tremblay"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
      </Box>
    );
}

export default SearchPatientBar;