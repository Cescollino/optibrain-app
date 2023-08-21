import { Box } from "@mui/material"
import { ReactNode } from "react"

type PatientRecordBoxProps = {
  header: ReactNode
  content: ReactNode
  visualContent?: ReactNode
  fab?: ReactNode
}

const PatientRecordBox = ({ header, content, fab, visualContent }: PatientRecordBoxProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {header}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {content}
      </Box>
      {visualContent}
      {fab}
    </Box>
  )
}

export default PatientRecordBox

