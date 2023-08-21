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


type NeurologicalStateData = {
    data: { time: string; state: number }[]
}

// TODO : find a better way to format the axis
function formatPatientState(value: number): string {
    switch (value) {
        case 5:
            return 'Ischémie'
        case 4:
            return 'Hyperthémie'
        case 3:
            return "Contrôlé"
        case 2:
            return "HTIC isolée"
        case 1:
            return "HTIC + Hyperthémie"
        case 0:
            return "HTIC + Ishémie"
        default:
            return ""
    }
}

const NeurologicalStateChart = ( { data }: NeurologicalStateData) => {
  const { palette } = useTheme()
  const margin = {
    top: 30,
    right: 10,
    bottom: 10,
    left: 20,
  }

  const ticksYValue = [0, 1, 2, 3, 4, 5]

  return (
    <DashboardBox sx={{ display: "flex", minWidth: 259, maxHeight: 278, backgroundColor: palette.primary.dark, opacity: '40%', flexGrow: 1, placeItems: "center", justifyContent: "center" }}>
      <ResponsiveContainer minWidth={245} maxHeight={250} >
        <LineChart
          width={184}
          height={200}
          margin={margin}
          data={data}
        >
          <CartesianGrid/>
          <XAxis dataKey="time" tick={true} tickLine={false} style={{ fontSize: "10px"}} interval={0} />
          <YAxis dataKey="state" ticks={ticksYValue} domain={[0, 5]} tickLine={false} tick={{ fontSize: 10, dx: -10}} tickFormatter={formatPatientState} interval={0} />
          <Tooltip />
          <Line type="monotone" dataKey="state" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
      </ResponsiveContainer>
    </DashboardBox> 
  )
}

export default NeurologicalStateChart