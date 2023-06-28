import { Accordion, AccordionSummary, AccordionDetails, Fab, Chip, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

function ExtendableAccordion() {
  const chips: string[] = [
    "Leucopénie",
    "Calcium",
    "Hyperleucocytose",
    "PACO2",
    "Gaz sanguins",
    "Marqueurs"
  ];

  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);
  };

  return (
    <Accordion sx={{ backgroundColor: "transparent", width: "100%"}}>
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
        <Fab aria-label="add" sx={{ width: '36px', height: '29px', border: '2px solid #F5F5F5', backgroundColor: "transparent"}}>
            <AddIcon sx={{ height: '10.33 px', width: '10.33 px', color: 'white'}} />
        </Fab>
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
        {chips.map((chip, index) => (
            <Chip key={index} label={chip} sx={{ width: '137px', height: '30px', backgroundColor: '#070818', color: 'white'}}
              onClick={() => handleChipClick(chip)} 
            />
        ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default ExtendableAccordion;
