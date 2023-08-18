import { useContext, useEffect } from 'react'
import {Routes as Router, Route, Navigate, Outlet, useNavigate} from 'react-router-dom'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import BrainDashboard from "@/dashboards/brain";
import Login from '@/components/login'
import { usePatients } from './contexts/PatientsContext';
import { useCurrentPatient } from './contexts/CurrentPatientContext';
import IPatient from '@/types/Patient';
import { ContinuousData } from './api/services/KpiService';
import { useKpisData } from './contexts/KpisContext';

type Props = {
  patients: IPatient[],
  currentPatient: IPatient | undefined
  kpisData: ContinuousData[]
}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthenticationContext)
 
  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}
 
const Routes = (fetchedData: Props) => {
  const { patients, addPatients } = usePatients()
  const { currentPatient, setCurrentPatient } = useCurrentPatient()
  const { patientKpisData, addKpisData } = useKpisData()

  // TODO : manage fetching to optimize the cache of the data by react query library
  useEffect(() => {
    addPatients(fetchedData.patients)
  }, [fetchedData.patients, addPatients])

  useEffect(() => {
    setCurrentPatient(fetchedData.currentPatient)
  }, [fetchedData.currentPatient, setCurrentPatient])

  
  useEffect(() => {
    addKpisData(fetchedData.kpisData)
  }, [fetchedData.kpisData, addKpisData])

  console.log('patients', patients)
  console.log('current patient : ', currentPatient)
  console.log('kpis : ', patientKpisData)
  return (
      <Router>
        <Route path='/login' element={<Login />}/>
        <Route element={<PrivateRoutes />}>
          {/* <Route path='/logout' element={<Login />}/> */}
          <Route path='/dashboard/brain/noadmsip/:noadmsip' element={<BrainDashboard />} />
        </Route>
      </Router>
  )
}

export default Routes