import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { PeriodeInput } from '../periode/PeriodeInput';
import {DagerInput} from "../dager/DagerInput";

interface DagerEnkelProps {
  id: string
}

const DagerEnkel = ({ id }: DagerEnkelProps) => {
  const { perioder, setPerioder } = useAppStore();
  const periode = perioder.find(p => p.id === id);
  const onChange = (antall) => {
    if (periode){
      periode.antallDagerMedRefusjon = antall;
    }
    setPerioder([...perioder]);
  };
  return (
    <div>{periode?.antallDagerMedRefusjon}</div>
    // <DagerInput
    //    feilmelding={periode?.errorMessage}
    //              handleChange={onChange}
    // />
  )
}

export default DagerEnkel;
