import React, { createContext, useContext, useState } from 'react';
import GetLoginExpiry from '../api/LoginExpiryAPI';

export const buildLoginExpiryContext = (timeoutAdvarselHarBlittVist: boolean, loginExpiry?: Date) => ({
  loginExpiry,
  timeoutAdvarselHarBlittVist,
  setTimeoutAdvarselHarBlittVist: function (harBlittVist) {
  }
})

const LoginExpiryContext = createContext(buildLoginExpiryContext( false));

interface LoginExpiryContextProviderProps {
  children: any
}

export const useLoginExpiry = () => useContext(LoginExpiryContext);

const LoginExpiryProvider = (props: LoginExpiryContextProviderProps) => {
  const [ status, setStatus ]  = useState<number>(0);
  const [ timeoutAdvarselHarBlittVist, setTimeoutAdvarselHarBlittVist ]  = useState<boolean>(false);
  const [ loginExpiry, setLoginExpiry ] = useState<Date>();
  if (status === 0){
    GetLoginExpiry().then(
      res => {
        setLoginExpiry(res.tidspunkt)
      }
    )
    setStatus(1)
  }
  return (
    <LoginExpiryContext.Provider value={{ loginExpiry, timeoutAdvarselHarBlittVist, setTimeoutAdvarselHarBlittVist }}>
      { props.children }
    </LoginExpiryContext.Provider>
  )
}

export default LoginExpiryProvider;
