import CircleIcon from '@mui/icons-material/Circle';
import { Box } from "@mui/material";
import KpiBox from "../kpi/KpiBox";
import { StatusColor } from '@/types/patientState';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NeurologicalStateBar = ({ score }: { score: number }) => {
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
                justifyItems: "center"
              }} 
          >
              <CircleIcon sx={{ fontSize: '24px', color: StatusColor.RED }}/>
              <CircleIcon sx={{ fontSize: '24px', color: StatusColor.RED }}/>
              <CircleIcon sx={{ fontSize: '24px', color: StatusColor.ORANGE }}/>
              <CircleIcon sx={{ fontSize: '24px', color: StatusColor.GREEN }}/>
              <CircleIcon sx={{ fontSize: '24px', color: StatusColor.ORANGE }}/>
              <CircleIcon sx={{ fontSize: '24px', color: StatusColor.ORANGE }}/>
          </KpiBox> 
          </Box>
        
    </>
  )
}

export default NeurologicalStateBar;
