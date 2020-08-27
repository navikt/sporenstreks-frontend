import React from 'react';
import { Redirect, useLocation } from 'react-router-dom'
import { Linker } from '../../pages/Linker';

const Redirecter = () => {
  const location: any = useLocation();
  if(location && location.search.includes('refresh=true')) {
    return <Redirect to={Linker.LoginFornyet} />
  }
  const params = location && location.search ? location.search : '';
  return <Redirect to={Linker.Bulk + params} />
}

export default Redirecter;
