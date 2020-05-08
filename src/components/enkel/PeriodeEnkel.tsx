import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { PeriodeInput } from '../periode/PeriodeInput';

interface PeriodeEnkelProps {
  id: string
}

const PeriodeEnkel = ({id}: PeriodeEnkelProps) => {
  const { perioder, setPerioder } = useAppStore();
  const periode = perioder.find(p => p.id === id);
  const onChange = (fom, tom) => {
    if (periode){
      periode.fom = fom;
      periode.tom = tom;
    }
    setPerioder([...perioder]);
  };
  return (
    <PeriodeInput id={periode?.id} fom={periode?.fom} tom={periode?.tom} feilmelding={periode?.errorMessage} handleChange={onChange}/>
  )
}

export default PeriodeEnkel;
