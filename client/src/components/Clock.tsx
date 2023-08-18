import React, { useEffect, useState, FC } from 'react'
import { Typography } from '@mui/material'
import DashboardBox from '@/components/DashboardBox'

/* This component was an idea to show the time and date in the dashboard
   It is not used in the prototype version of the project */
const Clock: FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }
  const formattedTime = time.toLocaleTimeString([], options)
  const formattedDay = time.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <DashboardBox sx={{display: 'flex', justifyContent: 'space-between', placeItems: 'center'}}>
      <Typography variant="h2" sx={{color: 'white', ml: '2rem'}}> {formattedTime} </Typography>
      <Typography variant="h2" sx={{color: 'white', mr: '2rem'}}> {formattedDay} </Typography>
    </DashboardBox>
  )
}

export default Clock
