import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { RefusjonInput } from '../refusjon/RefusjonInput';

interface RefusjonEnkelProps {
  id: string
}

const RefusjonEnkel = ({ id }: RefusjonEnkelProps) => {
  const { perioder, setPerioder } = useAppStore();
  const periode = perioder.find(p => p.id === id);
  const onChange = (refusjon) => {
    if (periode){
      periode.beloep = refusjon;
    }
    setPerioder([...perioder]);
  };
  return (
    <RefusjonInput beloep={periode?.beloep} feilmelding={periode?.errorMessage} handleChange={onChange}/>
  )
}

export default RefusjonEnkel;
