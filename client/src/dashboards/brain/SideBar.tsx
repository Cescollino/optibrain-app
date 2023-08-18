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
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const handleTabChange = (newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const tabsData = [
    {
      icon: <HomeIcon />,
      color: palette.blue.main,
    },
    {
      icon: <PatientIcon />,
      color: palette.blue.main,
    },
    {
      icon: <BrainIcon />,
      color: palette.blue.main,
    },
    {
      icon: <HeartIcon />,
      color: palette.blue.main,
    },
    {
      icon: <LungsIcon />,
      color: palette.blue.main,
    },
    {
      icon: <KidneyIcon />,
      color: palette.blue.main,
    },
    {
      icon: <InfectionIcon />,
      color: palette.blue.main,
    },
    {
      icon: <GastroIcon />,
      color: palette.blue.main,
    },
  ]

  return (
    <>
      <DashboardBox sx={{ width: 'min-content', mb: '0.5rem' }}>
        <Tabs
          orientation="vertical"
          value={selectedTabIndex}
          onChange={(event, newValue) => handleTabChange(newValue)}
          sx={{
            borderLeft: 1,
            borderColor: 'divider',
          }}
          TabIndicatorProps={{
            title: 'indicator',
            sx: {
              backgroundColor: tabsData[selectedTabIndex].color,
              height: 3,
              borderRadius: '1rem',
              left: 2,
              width: 3,
            },
          }}
        >
          {tabsData.map((tab, index) => (
            <Tab
              key={index}
              icon={React.cloneElement(tab.icon, {
                color: selectedTabIndex === index ? tab.color : 'white',
              })}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </DashboardBox>
    </>
  );
}
