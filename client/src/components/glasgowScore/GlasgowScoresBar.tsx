import { Box, Grid  } from "@mui/material";
import KpiProgressBox from "../kpi/KpiProgressBox";
import KpiBox from "../kpi/KpiBox";
import { StatusColor } from "@/types/patientState";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const GlasgowScoresBar = ({ score }: { score: number}) => {
    return (
    <>
          <Box sx={{ display: 'flex', width: `${score + 1}%`, justifyContent: 'end' }}>
            <ArrowDropDownIcon sx={{ color: '#7A8599', fontSize: '40px', padding: 0 }} />
          </Box>
          <Box 
            sx={{
              position: 'relative', 
              width: "278px", 
              height: "30px",
            }}
          >
          <KpiBox 
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                justifyItems: "center",
              }} 
          >
              <Grid  
                container
                direction="row"
                textAlign="center" 
                spacing={0.1}
                alignItems='center'
              >
                <Grid item xs>
                  <KpiProgressBox progress={100} sx={{ color: StatusColor.RED, display: 'flex', justifyContent: 'center' }}>3-8</KpiProgressBox>
                </Grid>
                <Grid item xs>
                  <KpiProgressBox progress={100} sx={{ color: StatusColor.ORANGE, display: 'flex', justifyContent: 'center' }}>9-12</KpiProgressBox>
                </Grid>
                <Grid item xs>
                  <KpiProgressBox progress={100}  sx={{ color: StatusColor.GREEN, display: 'flex', justifyContent: 'center' }}>13-15</KpiProgressBox>
                </Grid>
              </Grid>
            </KpiBox>
          </Box>
    </>
  )
}

export default GlasgowScoresBar;