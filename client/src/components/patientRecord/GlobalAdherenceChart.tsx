import { Box } from "@mui/material"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


type GlobalAdherenceData = {
    data: { day: string; score: number; }[];
}


function formatYAxis(value: number): string { return value % 20 === 0 ? value.toString() : ""; }
function formatXAxis(value: string): string { return (value === "J01") || (value === "J09") ? value : ""; }

const GlobalAdherenceChart = ( { data }: GlobalAdherenceData) => {
    const margin = {
        top: 20,
        right: 20,
        bottom: 0,
        left: -10,
    };
    const ticksYValue = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const ticksXValue = ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09"];

  return (
    <Box sx={{ display: "flex",  flexDirection: "column", padding: '1rem', gap: "1rem", borderRadius: "20px", backgroundColor: "#070818", opacity: '40%', boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.25)' }}>
      <LineChart
        width={259}
        height={278}
        margin={margin}
        data={data}
      >
        <CartesianGrid />
        <XAxis dataKey="day" ticks={ticksXValue} tickLine={false} tickFormatter={formatXAxis} tickMargin={5} interval={0} />
        <YAxis dataKey="score" ticks={ticksYValue} domain={[0, 100]} tickLine={false} tickFormatter={formatYAxis} tickMargin={10} interval={0} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8"  />
      </LineChart>
    </Box>
  );
}

export default GlobalAdherenceChart;