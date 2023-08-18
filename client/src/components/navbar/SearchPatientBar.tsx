import { Fab, useTheme } from '@mui/material'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'

const SearchPatientBar= () => {
    const { palette } = useTheme()

    // TODO: Implement a search patient function
    const handleClick = () => {}

    return (
          <Fab 
            onClick={handleClick}
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
    )
}

export default SearchPatientBar