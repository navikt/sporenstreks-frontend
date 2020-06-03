import React from 'react';
import { useLoginExpiry } from '../../context/LoginExpiryContext';

const TokenUtloper = () => {
  const { loginExpiry } = useLoginExpiry();
  return <>{ loginExpiry }</>
}

export default TokenUtloper;
