import { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet, useNavigate} from 'react-router-dom'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import BrainDashboard from "@/dashboards/brain";
import Login from '@/dashboards/login'

import IPatient from '@/types/Patient';
import { PatientsContext } from './contexts/PatientsContext';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthenticationContext)

  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}


const Routes = () => {
  const { patients } = useContext(PatientsContext)

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