import React, { useContext, useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Fab, Chip, Box, styled} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import Kpi from '@/components/kpi/Kpi';
import { KpisBoxProps, KpiProps } from '@/types/types';
import { kpisBoxes, optionalKpis } from '@/data/data';
import TimeFrameContext from '@/contexts/TimeFrameContext';
import KpiChart from '@/components/kpi/KpiChart';
import { useDeviationScore } from '@/contexts/DeviationScoreContext';
import { DefaultComponentProps, OverridableComponent, OverridableTypeMap } from '@mui/material/OverridableComponent';
import { useKpisData } from '@/contexts/KpisContext';

const StyledFab = styled(Fab)(({ theme }) => ({
  width: '36px',
  height: '29px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))


const TargetKpisBoxes = () => {
  const { data: deviationData } = useDeviationScore()
  const { data: kpisData } = useKpisData()
  const { selectedFrameLabel } = useContext(TimeFrameContext)

  const [kpiCharts, setKpiVisibleCharts] = useState<KpiProps[]>([])
  const [kpiList, setKpiList] = useState<KpisBoxProps[]>(kpisBoxes)
  const [expanded, setExpanded] = useState(false)

  const icons = [
    <AddCircleOutlineIcon sx={{ display: 'flex', flexGrow: 1, height: '34px', width: '34px', color: 'white'}} />,
    <RemoveCircleOutlineIcon sx={{ display: 'flex', flexGrow: 1, height: '34px', width: '34px', color: 'white'}} />, 
  ]

  const [expandedIcon, setExpandedIcon] = useState(icons[0]);

  useEffect(() => {
    setExpandedIcon((expanded ? icons[0] : icons[1]))
  }, [expanded])

  const handleKpiClick = (selectedKpi: KpiProps, box: KpisBoxProps) => () => {
    setKpiVisibleCharts( prevCharts => {
      const chartIndex = prevCharts.findIndex((chart) => chart.variable === selectedKpi.variable)

      // chart is already visible, remove it from the list
      return chartIndex !== -1 ? prevCharts.filter((_, index) => index !== chartIndex) 
      // chart is not visible, add it to the list
      : [...prevCharts, 
        { variable: selectedKpi.variable,
          continueData: selectedKpi.continueData, 
          targetThreshold: selectedKpi.targetThreshold, 
          boxCategory: box.category } as KpiProps
        ]
    })
  };
  
  // const handleKpiChipClick = (selectedKpi: KpiProps, box: KpisBoxProps) => () => {
  //   setKpiList( prevKpiList => {
  //     const updatedKpiList = prevKpiList.map(prevBox =>
  //       prevBox.category === box.category
  //         ? {
  //             ...prevBox,
  //             kpis: prevBox.kpis.map(prevKpi =>
  //               prevKpi.variable === selectedKpi.variable ? { ...prevKpi, display: !prevKpi.display } : prevKpi
  //             ),
  //           }
  //         : prevBox
  //     );
  //     return updatedKpiList
  //   });
  // };

  // useEffect(() => {
  //   setKpiList(kpisBoxes);
  // }, [selectedFrameLabel]);

  // useEffect(() => {
  //   setKpiVisibleCharts(kpiCharts);
  // }, [kpiCharts, kpiCharts.length]);

  return (
    <>
      {/* {kpiList.map((box, index) => (
        <Box key={index} sx={{ display: 'inline-flex', flexGrow: 1, flexDirection: 'column'}}>
        <DashboardBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: "374px",
            flexGrow: 1,
            gap: 1,

            alignItems: 'center',
            margin: '0.5rem',
            justifyContent: 'space-between',
          }}
        >
          <BoxHeader title={box.category}/>
          // {/* DISPLAYED KPIS */}
          {/* {deviationData?.map((data, index) =>
            <Kpi key={index} variable={data.kpi} onClick={handleKpiClick(data, index)} targetData={data.scores} targetThreshold={kpi.targetThreshold} timeFrame={parseInt(selectedFrameLabel)} /> 
          )}
          {/* OPTIONAL KPIS */}
          {/* {box.optional &&
          (<Accordion sx={{ backgroundColor: "transparent", width: "100%"}}>
            <AccordionSummary
              aria-controls="panel-content" 
              id="panel-header" 
              sx={{
                  '& .MuiAccordionSummary-content': {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
              }}
              >
              <StyledFab key={index} onClick={() => setExpanded(!expanded)}> 
                {expandedIcon}
              </StyledFab>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '4px',
                  backgroundColor: 'none',
                  placeItems: 'center', 
                }}
              >
              {/* HIDDEN KPIS */}
              {/* {optionalKpis.map((kpi, index) => 
                  (<Chip 
                    key={index} 
                    label={kpi.variable}
                    sx={{ width: '137px', height: '30px', backgroundColor: '#070818', color: 'white'}}
                    onClick={handleKpiChipClick(kpi, box)}
                  />)
              )}
              </Box>
            </AccordionDetails>
          </Accordion>)}
        </DashboardBox>
        <DashboardBox key={box.category}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            gap: 1,

            alignItems: 'center',
            margin: '0.5rem',
            justifyContent: 'space-between',
          }}>
          {kpiCharts.map((kpi, index) => (kpi.boxCategory === box.category) && (<KpiChart key={index} variable={kpi.variable} continueData={kpi.continueData} targetThreshold={kpi.targetThreshold} timeFrame={kpi.timeFrame}/>))}
        </DashboardBox>
        </Box> }
      ))} } */}
    </>
  )
}

export default TargetKpisBoxes


