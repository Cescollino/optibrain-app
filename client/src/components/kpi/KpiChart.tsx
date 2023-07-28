import { Box } from "@mui/material";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import ChartHeader from '@/components/ChartHeader';
import { KpisChartData } from "@/state/types";
import { KpiProps } from "@/state/types";


const KpiChart = ({ variable, continueData, targetThreshold }: KpiProps) => {
  const margin = {
    top: 20,
    right: 20,
    bottom: 0,
    left: -10,
};
  console.log(variable);
  if (!continueData) continueData = { data: [], time: '2023-07-01 00:00:00', value: 90 } as KpisChartData ;

  return (
    <Box sx={{ display: 'flex', width: '100%', flexGrow: 1, flexDirection: 'column', gap: 1, justifyContent: 'space-between'}}>
      <ChartHeader
          title={variable}
          lastValue={continueData ? continueData.data[continueData.data.length - 1] : 0}
          targetThreshold={targetThreshold}
      />
      <LineChart
        width={259}
        height={278}
        margin={margin}
        data={continueData.data}
      >
        <CartesianGrid />
        <XAxis dataKey="day" tickLine={false} tickMargin={5} interval={0} />
        <YAxis dataKey="score" domain={[0, 100]} tickLine={false} tickMargin={10} interval={0} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8"  />
      </LineChart>
  </Box>
  );
}

export default KpiChart;

                            
 