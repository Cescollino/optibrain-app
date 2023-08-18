import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Accordion, AccordionSummary, AccordionDetails, Chip, Box} from '@mui/material'
import { useContext, useState, useEffect, SyntheticEvent } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import Kpi from '@/components/kpi/Kpi'
import KpiChart from '@/components/kpi/KpiChart'

import { KpisBoxProps, KpiProps } from '@/types/types'
import { kpisBoxes, optionalKpis } from '@/data/data'
import { useDeviationScore } from '@/contexts/DeviationScoreContext'
import TimeFrameContext from '@/contexts/TimeFrameContext'

const TargetKpisBoxes = () => {
  // const { data: deviationData } = useDeviationScore()
  // const { patientKpisData } = useKpisData()
  const { selectedFrameLabel } = useContext(TimeFrameContext)

  const [kpiCharts, setKpiVisibleCharts] = useState<KpiProps[]>([])
  const [kpiList, setKpiList] = useState<KpisBoxProps[]>(kpisBoxes)

  const [expanded, setExpanded] = useState<string | false>(false)

  const ExpandedIcon = (newExpanded: boolean) => 
    newExpanded ? <RemoveCircleOutlineIcon sx={{ display: 'flex', flexGrow: 1, height: '34px', width: '34px', color: 'white'}} /> 
    : <AddCircleOutlineIcon sx={{ display: 'flex', flexGrow: 1, height: '34px', width: '34px', color: 'white'}} />

  const [expandedIcon, setExpandedIcon] = useState(ExpandedIcon(false))
  
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
  }

  const handleChange = (box: string) => (e: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? box : false)
    setExpandedIcon(ExpandedIcon(newExpanded))
  }


  const handleKpiChipClick = (selectedKpi: KpiProps, box: KpisBoxProps) => () => {
    setKpiList( prevKpiList => {
      const updatedKpiList = prevKpiList.map(prevBox =>
        prevBox.category === box.category
          ? {
              ...prevBox,
              kpis: prevBox.kpis.map(prevKpi =>
                prevKpi.variable === selectedKpi.variable ? { ...prevKpi, display: !prevKpi.display } : prevKpi
              ),
            }
          : prevBox
      )
      return updatedKpiList
    })
  }

  useEffect(() => {
    setKpiList(kpisBoxes)
  }, [selectedFrameLabel])

  useEffect(() => {
    setKpiVisibleCharts(kpiCharts)
  }, [kpiCharts, kpiCharts.length])

  return (
    <>
    {kpiList.map((box, index) => (
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
          {/* DISPLAYED KPIS */}
            {/* {deviationData?.map((data, index) =>
              <Kpi key={index} variable={data.kpi} onClick={handleKpiClick(data, index)} targetData={data.scores} targetThreshold={kpi.targetThreshold} timeFrame={parseInt(selectedFrameLabel)} /> 
            )}
          {/* OPTIONAL KPIS */}
          {box.optional &&
            (<Accordion expanded={expanded === box.category} sx={{ backgroundColor: "transparent", width: "100%"}} onChange={handleChange(box.category)}>
              <AccordionSummary
                aria-controls="panel-content" 
                id="panel-header" 
                sx={{
                    '& .MuiAccordionSummary-content': {
                      justifyContent: 'center',
                      alignItems: 'center',
                      placeItems: 'center',
                    },
                }}
                expandIcon={expandedIcon}
                >
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
              {optionalKpis.map((kpi, index) => 
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
        </Box>
      ))}
    </>
  )
}

export default TargetKpisBoxes


