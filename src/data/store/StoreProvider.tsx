import React from 'react';
import { AppStoreProvider } from './AppStore';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
  return (
    <AppStoreProvider>
      {props.children}
    </AppStoreProvider>
  );
};

export default StoreProvider;
