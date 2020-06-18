import React from 'react';
import { Redirect, useLocation } from 'react-router-dom'

const Redirecter = () => {
  const location: any = useLocation();
  if(location && location.search.includes('refresh=true')) {
    return <Redirect to={'/loginFornyet'} />
  }
  const params = location && location.search ? location.search : '';
  return <Redirect to={`/bulk/${params}`} />
}

export default Redirecter;
