import { useContext } from 'react'
import {Routes as Router, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '@/state/AuthentificationContext'
import Dashboard from "@/scenes/dashboard";
import Login from '@/scenes/login'

type Props = {}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext)

  if(!authenticated) return <Navigate to='/login' replace />

  return <Outlet />
}

const Routes = (props: Props) => {
  const { authenticated } = useContext(AuthContext)

  return (
    <Router>
      <Route path='/login' element={<Login />}/>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Dashboard />} />
      </Route>
    </Router>
  )
}

export default Routes