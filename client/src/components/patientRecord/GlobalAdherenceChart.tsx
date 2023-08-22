import DashboardBox from "@/components/DashboardBox"
import { useTheme } from "@mui/material"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"


type GlobalAdherenceData = {
    data: { day: string; score: number; }[]
}

function formatYAxis(value: number): string { return value % 20 === 0 ? value.toString() : "" }
function formatXAxis(value: string): string { return (value === "J01") || (value === "J09") ? value : "" }

const GlobalAdherenceChart = ( { data }: GlobalAdherenceData) => {
  const { palette } = useTheme()
    const margin = {
        top: 20,
        right: 10,
        bottom: 0,
        left: -30,
    }
    const ticksYValue = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const ticksXValue = ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09"]

  return (
    <>
      <DashboardBox sx={{ display: "flex", minWidth: 270, maxHeight: 278, backgroundColor: palette.primary.dark, opacity: '40%', flexGrow: 1, placeItems: "center", justifyContent: "center" }}>
        <ResponsiveContainer width={'99%'}>
          <LineChart
            width={219}
            height={179}
            margin={margin}
            data={data}
          >
            <CartesianGrid />
            <XAxis dataKey="day" ticks={ticksXValue} tickLine={false} tickFormatter={formatXAxis} style={{ fontSize: "10px"}} interval={0} />
            <YAxis dataKey="score" ticks={ticksYValue} domain={[0, 100]} tickLine={false} tickFormatter={formatYAxis} style={{ fontSize: "10px"}} interval={0} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8"  />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default GlobalAdherenceChart;