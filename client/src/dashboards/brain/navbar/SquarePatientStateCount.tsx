import { PatientStatus, StatusColor } from "@/state/patientState";
import { Box } from "@mui/material";

interface SquarePatientStateCountProps {
  status: string;
  count: number;
}

const SquarePatientStateCount = ({ status, count} : SquarePatientStateCountProps) => {
  let color: string;

  switch (status) {
    case PatientStatus.STABLE:
      color = StatusColor.GREEN;
      break;
    case PatientStatus.WATCH:
      color = StatusColor.ORANGE;
      break;
    case PatientStatus.CRITICAL:
      color = StatusColor.RED;
      break;
    default:
        color = "grey"
      break;
  }

  return (
    <Box
      sx={{
        width: "20%",
        height: "10%",
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        borderRadius: "5px",
        padding: "0.5rem",
        flexGrow: 1,
      }}
    >
      {count}
    </Box>
  );
};

export default SquarePatientStateCount;
