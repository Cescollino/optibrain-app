import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle'

import KpiBox from "@/components/kpi/KpiBox"
import { StatusColor } from '@/state/patientState'

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
            {/* TODO : These are hard coded */}
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

export default NeurologicalStateBar
