import React, { Component, SyntheticEvent } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { KpiProps, KpisBoxProps } from '@/types/types'

interface OptionalKpisAccordionProps {
  expanded: string | false
  box: KpisBoxProps
  handleChange: (box: string) => (event: React.SyntheticEvent, expanded: boolean) => void
  optionalKpis: KpiProps[]
  handleKpiChipClick: (selectedKpi: KpiProps, box: KpisBoxProps) => () => void
}

interface OptionalKpisAccordionState {
  toggled: boolean
}

class OptionalKpisAccordion extends Component<OptionalKpisAccordionProps, OptionalKpisAccordionState> {
  constructor(props: OptionalKpisAccordionProps) {
    super(props)
    this.state = {
      toggled: false,
    }
  }

  ExpandedIcon(newExpanded: boolean) {
    return newExpanded ? (
      <RemoveCircleOutlineIcon sx={{ display: 'flex', flexGrow: 1, height: '34px', width: '34px', color: 'white' }} />
    ) : (
      <AddCircleOutlineIcon sx={{ display: 'flex', flexGrow: 1, height: '34px', width: '34px', color: 'white' }} />
    )
  }

  render() {
    const { 
      expanded, 
      box, 
      handleChange, 
      optionalKpis, 
      handleKpiChipClick,

    } = this.props
    const expandedIcon = this.ExpandedIcon(expanded === box.category)

    return (
      <Accordion expanded={expanded === box.category} sx={{ backgroundColor: 'transparent', width: '100%' }} onChange={handleChange(box.category)}>
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
        >
          {expandedIcon}
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
            {optionalKpis.map((kpi, index) => (
              <Chip
                key={index}
                label={kpi.variable}
                sx={{ width: '137px', height: '30px', backgroundColor: '#070818', color: 'white' }}
                onClick={handleKpiChipClick(kpi, box)}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default OptionalKpisAccordion
