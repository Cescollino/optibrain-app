import { Box, useTheme } from "@mui/material"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


type Props = {
    data: { time: string; score: number | string; }[];
    yDomain: [number, number] | string[];
   
}

const PatientRecordTendenciesChart = ( { data, yDomain }: Props) => {
  const { palette } = useTheme();
  return (
    <Box sx={{ display: "flex",  flexShrink: 0, flexDirection: "column", padding: '1rem', gap: "1rem", borderRadius: "20px", backgroundColor: palette.primary.main, opacity: '40%', boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.25)' }}>
      <LineChart
        width={244}
        height={201}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        data={data}
      >
        <CartesianGrid horizontalPoints={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170]} />
        <XAxis dataKey={"time"} interval={0} tickMargin={10}  />
        <YAxis dataKey={"score"} domain={yDomain} interval={0} ticks={[20, 40, 60, 80, 100]} tickCount={11} tickMargin={10} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </Box>
  );
}

export default PatientRecordTendenciesChart;