import React from 'react';
import { useLoginExpiry } from '../../context/LoginExpiryContext';
import dayjs from 'dayjs';

const TokenUtloper = () => {
  const { loginExpiry } = useLoginExpiry();
  return <>{loginExpiry ? dayjs(loginExpiry).format('HH:mm') : ''}</>;
};

export default TokenUtloper;
