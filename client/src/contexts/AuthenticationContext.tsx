/**
 * Authentication Context
 * 
 * This context provides a way to manage and share the authentication state
 * across different components in the application. It includes the
 * current authentication status and a function to update that status.
 * 
 * @module AuthenticationContext
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

const initialValue: IAuthContext = {
  authenticated: false,
  setAuthenticated: () => {}
}

const AuthenticationContext = createContext<IAuthContext>(initialValue);

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
