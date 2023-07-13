import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material';
import DashboardBox from '@/components/DashboardBox';
import HomeIcon from '@/components/icons/HomeIcon';
import PatientIcon from '@/components/icons/PatientIcon';
import BrainIcon from '@/components/icons/BrainIcon';
import GastroIcon from '@/components/icons/GastroIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import InfectionIcon from '@/components/icons/InfectionIcon';
import KidneyIcon from '@/components/icons/KidneyIcon';
import LungsIcon from '@/components/icons/LungsIcon';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Sidebar() {
  const { palette } = useTheme();
  const [homeIndex, setHomeIndex] = useState<null | number>(null);
  const [systemIndex, setSystemIndex] = useState<null | number>(0);

  const handleTabChange = (tabType: string, newValue: number) => {
    if (tabType === 'home') {
      setHomeIndex(newValue);
      setSystemIndex(null);
    } else {
      setSystemIndex(newValue);
      setHomeIndex(null);
    }
  };

  return (
    <>
      <DashboardBox sx={{ width: 'min-content', mb: '0.5rem' }}>
        <Tabs
          orientation="vertical"
          value={homeIndex}
          onChange={(event, newValue) => handleTabChange('home', newValue)}
          sx={{
            borderLeft: 1,
            borderColor: 'divider',
          }}
          TabIndicatorProps={{
            title: 'indicator',
            sx: {
              backgroundColor: palette.blue.main,
              height: 3,
              borderRadius: '1rem',
              left: 2,
              width: 3,
            },
          }}
        >
          <Tab icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab icon={<PatientIcon />} {...a11yProps(1)} />
        </Tabs>
      </DashboardBox>

      <DashboardBox sx={{ width: 'min-content', mb: '0.5rem' }}>
        <Tabs
          orientation="vertical"
          value={systemIndex}
          onChange={(event, newValue) => handleTabChange('system', newValue)}
          sx={{
            borderLeft: 1,
            borderColor: 'divider',
          }}
          TabIndicatorProps={{
            title: 'indicator',
            sx: {
              backgroundColor: palette.blue.main,
              height: 3,
              borderRadius: '1rem',
              left: 2,
              width: 3,
            },
          }}
        >
          <Tab icon={<BrainIcon />} {...a11yProps(0)} />
          <Tab icon={<HeartIcon />} {...a11yProps(1)} />
          <Tab icon={<LungsIcon />} {...a11yProps(2)} />
          <Tab icon={<KidneyIcon />} {...a11yProps(3)} />
          <Tab icon={<InfectionIcon />} {...a11yProps(4)} />
          <Tab icon={<GastroIcon />} {...a11yProps(5)} />
        </Tabs>
      </DashboardBox>
    </>
  );
}
