import { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import Dashboard from "@/scenes/dashboard";
import Login from '@/scenes/login'
import { PatientData } from '@/state/types';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthenticationContext)

  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

const Routes = ( { patient } : { patient: PatientData }) => {
  const { authenticated } = useContext(AuthenticationContext)

  return (
    <Router>
      <Route path='/login' element={<Login />}/>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Dashboard patient={patient} />} />
      </Route>
    </Router>
  )
}

export default Routes