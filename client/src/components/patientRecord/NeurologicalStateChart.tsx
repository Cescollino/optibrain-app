import { Box } from "@mui/material"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"


type NeurologicalStateData = {
    data: { time: string; state: number }[]
}

// TODO : find a better way to format the axis
function formatPatientState(value: number): string {
    switch (value) {
        case 0:
            return 'Ischémie'
        case 1:
            return 'Hyperthémie'
        case 2:
            return "Contrôlé"
        case 3:
            return "HTIC isolée"
        case 4:
            return "HTIC + Hyperthémie"
        case 5:
            return "HTIC + Ishémie"
        default:
            return ""
    }
}

const NeurologicalStateChart = ( { data }: NeurologicalStateData) => {
  const margin = {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
  }
    
  return (
    <Box sx={{ display: "flex",  flexDirection: "column", padding: '1rem', gap: "1rem", borderRadius: "20px", backgroundColor: "#070818", opacity: '40%', boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.25)' }}>
      <LineChart
        width={300}
        height={200}
        margin={margin}
        data={data}
      >
        <CartesianGrid />
        <XAxis dataKey="time" type="category" ticks={["4:00", "10:00"]} tick={true} tickLine={false} interval={0} />
        <YAxis dataKey="state" type="category" tickLine={false} tick={{ fontSize: 10 }} tickFormatter={formatPatientState} interval={0} />
        <Tooltip />
        <Line type="monotone" dataKey="state" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </Box> 
  )
}

export default NeurologicalStateChart