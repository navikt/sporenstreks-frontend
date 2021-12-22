import React, { FC, createContext, useContext, useState } from 'react';

interface AppStore {
  tokenExpired: boolean;
  setTokenExpired: (expired: boolean) => void;
}

export const buildAppStoreContext = () =>
  ({
    tokenExpired: false,
    setTokenExpired: (expired: boolean) => expired
  } as AppStore);

const AppStoreContext = createContext(buildAppStoreContext());

interface AppStoreContextProviderProps {
  defaultTokenExpired?: boolean;
}

export const useAppStore = () => useContext(AppStoreContext);

const AppStoreProvider: FC<AppStoreContextProviderProps> = ({
  defaultTokenExpired,
  children
}) => {
  const [tokenExpired, setTokenExpired] = useState<boolean>(
    defaultTokenExpired || false
  );
  return (
    <AppStoreContext.Provider value={{ tokenExpired, setTokenExpired }}>
      {children}
    </AppStoreContext.Provider>
  );
};

export default AppStoreProvider;
