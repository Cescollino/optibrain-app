import CircularProgress, { CircularProgressProps,} from '@mui/material/CircularProgress';
import { Typography, Box } from '@mui/material';
import { StatusColor } from "@/state/patientState";
import { useState, useEffect } from 'react';
import KpiProgressBox from '@/components/kpi/KpiProgressBox';
import KpiBox from '@/components/kpi/KpiBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function KpiCircularProgressBar(props: CircularProgressProps & { score: number, arrow?: string }) {
  const [progress, setProgress] = useState(0);
  const [statusColor, setStatusColor] = useState(StatusColor.GREEN);
  const [shadowColor, setShadowColor] = useState(StatusColor.SHADOW_GREEN);

  useEffect(() => {
    setProgress(props.score);
  }, [progress, props.score]);

  useEffect(() => {
    switch(true) {
        case props.score < 80 && props.score > 70 :
          setStatusColor(StatusColor.ORANGE);
          setShadowColor(StatusColor.SHADOW_ORANGE);
          break;
  
        case props.score >= 80:
          setStatusColor(StatusColor.GREEN);
          setShadowColor(StatusColor.SHADOW_GREEN);
          break;
        default:
          setStatusColor(StatusColor.RED);
          setShadowColor(StatusColor.SHADOW_RED);
          break;
      }
  }, [statusColor, props.score]);

    return (
      <>
        {props.arrow && (
          <Box sx={{ display: 'flex', width: `${props.score + 1}%`, justifyContent: 'end' }}>
            <ArrowDropDownIcon sx={{ color: '#7A8599', fontSize: '40px', padding: 0 }} />
          </Box>
        )}
        <KpiBox>
          <KpiProgressBox 
              progress={props.score}
              sx={{ 
                  display: 'flex',
                  alignItems: "center", 
                  justifyContent: "end",
              }}
          >
            <Box sx={{ position: 'relative', display: 'inline-block', top: "6%" }}>
              <CircularProgress
                  size='2rem' 
                  variant="determinate"
                  thickness={7}
                  sx={{
                      borderRadius: '50%',
                      boxShadow: `inset 0 0 0 5px ${shadowColor}`,
                      color: statusColor,
                      zIndex: 1,
                  }}
                  {...props} 
              />
              <Typography
                  sx={{
                    position: 'absolute',
                    top: '42%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  fontSize={10}
                  variant="caption"
                  fontWeight={500}
                  lineHeight='14px'
                  color={statusColor}
                  >{`${Math.round(progress)}`}
              </Typography>
            </Box>
        </KpiProgressBox>
      </KpiBox>
    </>
  );
}

export default KpiCircularProgressBar;

