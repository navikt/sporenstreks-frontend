import React, { createContext, useContext, useState } from 'react';

interface AppStore {
  tokenExpired: boolean,
  setTokenExpired
}

export const buildAppStoreContext = () => ({
  tokenExpired: false,
  setTokenExpired: function(expired: boolean) {} // eslint-disable-line @typescript-eslint/no-unused-vars
}) as AppStore

const AppStoreContext = createContext(buildAppStoreContext());

interface AppStoreContextProviderProps {
  children: any,
  tokenExpired?: boolean
}

export const useAppStore = () => useContext(AppStoreContext);

const AppStoreProvider = (props: AppStoreContextProviderProps) => {
  const [ tokenExpired, setTokenExpired ] = useState<boolean>(props.tokenExpired || false);
  return (
    <AppStoreContext.Provider value={{ tokenExpired, setTokenExpired }}>
      { props.children }
    </AppStoreContext.Provider>
  )
}

export default AppStoreProvider;
