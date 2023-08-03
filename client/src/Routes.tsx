import { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import Dashboard from "@/scenes/dashboard";
import Login from '@/scenes/login'
import { PatientData } from '@/state/types';
import Beds from '@/scenes/beds'
import { PatientContext } from './contexts/PatientContext';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthenticationContext)

  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

const Routes = () => {

  return (
    <Router>
      <Route path='/login' element={<Login />}/>
      <Route element={<PrivateRoutes />}>
        {/* <Route path='/logout' element={<Login />}/> */}
        <Route path='/beds' element={< Beds/>} />
        <Route path='/' element={<Dashboard />} />
      </Route>
    </Router>
  )
}

export default Routes