import { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet, useNavigate} from 'react-router-dom'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import BrainDashboard from "@/dashboards/brain";
import Login from '@/dashboards/login'

import IPatient from '@/types/Patient';

type Props = {
  patients: IPatient[]
}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthenticationContext)

  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}


const Routes = ({ patients }: Props) => {

  return (
    <Router>
      <Route path='/login' element={<Login />}/>
      <Route element={<PrivateRoutes />}>
        {/* <Route path='/logout' element={<Login />}/> */}
        <Route path='/' element={<BrainDashboard patients={patients}/>} />
        <Route path='/:noadmsip' element={<BrainDashboard patients={patients} />} />
      </Route>
    </Router>
  )
}

export default Routes