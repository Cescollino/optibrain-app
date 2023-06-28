import { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BrainIcon from "@/components/icons/BrainIcon";
import GastroIcon from "@/components/icons/GastroIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import InfectionIcon from "@/components/icons/InfectionIcon";
import KidneyIcon from "@/components/icons/KidneyIcon";
import LungsIcon from "@/components/icons/LungsIcon";
import { useTheme } from '@mui/material'

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function SystemsSidebar() {
  const { palette } = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ 
          borderLeft: 1, 
          borderColor: 'divider' 
        }}
        TabIndicatorProps={{
          title: "indicator",
          sx: { 
            backgroundColor: palette.indigo[500],
            height: 3, 
            borderRadius: "1rem",
            left: 2,
            width: 3 
          } 
        }}
      >
        <Tab icon={<BrainIcon />} {...a11yProps(0)} />
        <Tab icon={<LungsIcon />} {...a11yProps(1)} />
        <Tab icon={<HeartIcon />} {...a11yProps(2)} />
        <Tab icon={<KidneyIcon />} {...a11yProps(3)} />
        <Tab icon={<InfectionIcon />} {...a11yProps(4)} />
        <Tab icon={<GastroIcon />} {...a11yProps(5)} />
      </Tabs>
  );
}
