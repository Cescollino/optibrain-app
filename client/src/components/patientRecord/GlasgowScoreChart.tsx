import { Box } from "@mui/material"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";


type GlasgowScoreChartData = {
    data: { day: string; score: number; }[];
}

function formatYAxis(value: number): string { return value % 5 === 0 ? value.toString() : ""; }
function formatXAxis(value: string): string { return (value === "J01") || (value === "J09") ? value : ""; }

const GlasgowScoreChart = ( { data }: GlasgowScoreChartData) => {
    const margin = {
        top: 20,
        right: 10,
        bottom: 0,
        left: 0,
    };

    const ticksYValue = Array.from({length: 5}, (_, i) => { return (i !== 0 && i < 4) ? i * 5 : i + 3 });
    const ticksXValue = ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09"];
    
  return (
    <Box sx={{ display: "flex",  flexDirection: "column", padding: '1rem', gap: "1rem", borderRadius: "20px", backgroundColor: "#070818", opacity: '40%', boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.25)' }}>
      <LineChart
        width={290}
        height={200}
        margin={margin}
        data={data}
      >
        <CartesianGrid />
        <XAxis dataKey="day" ticks={ticksXValue} tickLine={false} tickFormatter={formatXAxis} tickMargin={5} interval={0} />
        <YAxis dataKey="score" ticks={ticksYValue} domain={[0, 15]} tickLine={false} tickFormatter={formatYAxis} tickMargin={10} interval={0} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8"  />
      </LineChart>
    </Box> 
  );
}

export default GlasgowScoreChart;