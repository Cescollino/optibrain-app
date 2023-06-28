import React, { useEffect, useState, FC } from 'react';
import { Typography } from '@mui/material';
import DashboardBox from './DashboardBox';

const Clock: FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }
  const formattedTime = time.toLocaleTimeString([], options);
  const formattedDay = time.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <DashboardBox sx={{display: 'flex', justifyContent: 'space-between', placeItems: 'center'}}>
      <Typography variant="h2" sx={{color: 'white', ml: '2rem'}}> {formattedTime} </Typography>
      <Typography variant="h2" sx={{color: 'white', mr: '2rem'}}> {formattedDay} </Typography>
    </DashboardBox>
  );
};

export default Clock;
