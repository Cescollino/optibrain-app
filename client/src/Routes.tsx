import { useContext, useEffect } from 'react'
import {Routes as Router, Route, Navigate, Outlet } from 'react-router-dom'

import BrainDashboard from "@/dashboards/brain"
import { ContinuousData } from '@/api/services/KpiService'
import Login from '@/components/login'
import { IPatient } from '@/types/Patient'

import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { useCurrentPatient } from '@/contexts/CurrentPatientContext'
import { useKpisData } from '@/contexts/KpisContext'
import { usePatients } from '@/contexts/PatientsContext'

type Props = {
  patients: IPatient[],
  currentPatient: IPatient,
  // kpisData: ContinuousData[],
}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthenticationContext)
 
  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}
 
const Routes = (fetchedData: Props) => {
  const { addPatients } = usePatients()
  const { setCurrentPatient } = useCurrentPatient()
  // const { addKpisData } = useKpisData()

  // TODO : manage fetching to optimize the cache of the data by react query library
  // staleTime, fetchOnWindowFocus etc ...
  // useEffect(() => {
  //   addPatients(fetchedData.patients)
  // }, [fetchedData.patients, addPatients])

  // useEffect(() => {
  //   setCurrentPatient(fetchedData.currentPatient)
  // }, [fetchedData.currentPatient, setCurrentPatient])

  
  // useEffect(() => {
  //   addKpisData(fetchedData.kpisData)
  // }, [fetchedData.kpisData, addKpisData])

  useEffect(() => {
    addPatients(fetchedData.patients)
    setCurrentPatient(fetchedData.currentPatient)
  }, [])


  // TODO : manage the case where the patient is not found and navigate events
  return (
      <Router>
        <Route path='/login' element={<Login />}/>
        <Route element={<PrivateRoutes />}>
          {/* <Route path='/logout' element={<Login />}/> */}
          <Route path='/dashboard/brain/:noadmsip' element={<BrainDashboard />} />
        </Route>
      </Router>
  )
}

export default Routes