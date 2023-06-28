
import { useTheme } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@/components/icons/HomeIcon';
import PatientIcon from '@/components/icons/PatientIcon';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function HomeSidebar() {
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
        <Tab icon={<HomeIcon />} {...a11yProps(0)} />
        <Tab icon={<PatientIcon />} {...a11yProps(1)} />
      </Tabs>
  );
}

export default HomeSidebar;