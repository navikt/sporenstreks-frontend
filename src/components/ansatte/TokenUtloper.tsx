import React from 'react';
import dayjs from 'dayjs';
import getCookie from '../../util/getCookie';
import jwtDecode from 'jwt-decode';

const TokenUtloper = () => {
  const webToken = jwtDecode(getCookie('selvbetjening-idtoken'))
  const displayDate = dayjs(webToken.exp * 1000).format('HH:mm');

  return <>{displayDate}</>
}

export default TokenUtloper;
