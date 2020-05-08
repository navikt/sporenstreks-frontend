import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import FodselsnummerInput from '../fodelsnummer/FodselsnummerInput';

export const Fodselsnummer = () => {
  const { identityNumberInput, setIdentityNumberInput } = useAppStore();
  const handleChange = (fnr) => {
    setIdentityNumberInput(fnr);
  };
  return (
    <FodselsnummerInput handleChange={handleChange} fnr={identityNumberInput}
    />
  );
};
