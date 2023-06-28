import { Box, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ChartHeader from '../ChartHeader';
import { KpiProps } from "@/state/types";


const KpiChart = ({ variable, continueData, targetThreshold }: KpiProps) => {
  const { palette } = useTheme();
  if (!continueData) return null;

  return (
    <Box sx={{ display: 'flex', width: '100%', flexGrow: 1, flexDirection: 'column', gap: 1, justifyContent: 'space-between'}}>
      <ChartHeader
          title={variable}
          lastValue={continueData[continueData.length - 1].value}
          targetThreshold={targetThreshold}
      />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={500}
            height={300}
            data={continueData}    
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
        >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.primary[300]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[300]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={false}
          style={{ fontSize: "10px" }}
        />
        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tick={false}
          style={{ fontSize: "10px" }}
        />
        <Tooltip />
        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
      </BarChart>
    </ResponsiveContainer>
  </Box>
  );
}

export default KpiChart;

                            
 