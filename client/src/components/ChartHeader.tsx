import { Box, Typography, useTheme } from "@mui/material"
import { ReactNode } from "react"

import FlexBetween from "@/components/FlexBetween"
import KpiProgressBox from "@/components/kpi/KpiProgressBox"
import TargetIcon from "@/components/icons/TargetIcon"

type Props = {
  title: string
  lastValue: number
  targetThreshold?: string
  icon?: ReactNode
}

const ChartHeader = ({ icon, title, lastValue, targetThreshold }: Props) => {
  const { palette } = useTheme()
  return (
    <Box color={palette.grey[400]} margin="1.5rem 1rem 0 1rem" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{lastValue}mmHg</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        <KpiProgressBox progress={100} sx={{ display: 'inline-flex', justifyContent: 'center', minWidth: '137px', minHeight: '30px' }}  >
            <TargetIcon fontSize='small' sx={{ color: 'white'}} />
            <Typography variant="h5">{targetThreshold}</Typography>
        </KpiProgressBox>
      </Typography>
    </Box>
  )
}

export default ChartHeader