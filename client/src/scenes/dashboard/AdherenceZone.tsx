import { Fab, Grid, Typography } from "@mui/material";
import TargetKpisBoxes from "@/components/adherence/TargetKpisBoxes";
import KpiBox from "@/components/kpi/KpiBox";
import { useContext, useState } from "react";
import TimeFrameContext from "@/contexts/TimeFrameContext";


const TimeFrameBar = () => {
  const frameOptions: Array<string> = ['3', '6', '24'];
  const { selectedFrameLabel, updateFrameTime } = useContext(TimeFrameContext);

  const handleFrameTimeSelection = (option: string) => {
    updateFrameTime(option);
  };

  return (
    <KpiBox
      sx={{
        display: 'flex',
        flexDirection: 'row',
        placeItems: 'center',
        maxWidth: '300px',
        minHeight: '50px',
      }}
    >
      {frameOptions.map((option, index) => (
        <Fab
          key={index}
          variant="extended"
          sx={{
            display: 'flex',
            mr: 1,
            ml: 1,
            width: '100px',
            height: '30px',
            backgroundColor: option === selectedFrameLabel ? 'white' : 'grey',
          }}
          onClick={() => handleFrameTimeSelection(option)}
        >
          {option}h
        </Fab>
      ))}
    </KpiBox>
  );
};

const AdherenceZone = () => {
  const [selectedFrameLabel, setSelectedFrameLabel] = useState('3');

  const updateFrameTime = (option: string) => {
    setSelectedFrameLabel(option);
  };

  return (
    <>
    {/* Day JX container */}
    <TimeFrameContext.Provider value={{ selectedFrameLabel, updateFrameTime }}>
      <Grid container item direction="row" alignItems="center" xs="auto" justifyContent="flex-start" sx={{ ml: 2 }}>
        <Grid item xs={9}>
          <Typography variant="h4" fontSize="14px">% Adhérence/indicateurs</Typography>
        </Grid>
        <Grid container item xs={1} alignItems="center" justifyContent="flex-end">
          <TimeFrameBar />
        </Grid>
      </Grid>
      <Grid container item direction="row" alignItems="flex-start" style={{ flexGrow: 1 }} xs="auto" justifyContent="space-between">
        {/* Adherence boxes */}
        <TargetKpisBoxes />
      </Grid>
      </TimeFrameContext.Provider>
    </>
  );
};

export default AdherenceZone;
