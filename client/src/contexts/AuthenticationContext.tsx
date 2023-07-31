/* 
Author : GabrielIDNeto 
Github repository : https://github.com/GabrielDNeto/React-Authentication-ContextAPI---react-router-dom.git
*/

import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void
}

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {}
}

const AuthenticationContext = createContext<IAuthContext>(initialValue)

const AuthenticationProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)

  const navigate = useNavigate()

  return (
    <AuthenticationContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export {  AuthenticationContext, AuthenticationProvider };
