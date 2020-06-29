import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import validateRefusjon from '../refusjon/validateRefusjon';
import { RefusjonInput } from '../refusjon/RefusjonInput';
import HjelpetekstRefusjon from '../refusjon/HjelpetekstRefusjon';
import { AnsattID } from './Ansatt';

export const BulkRefusjon = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id);

  const handleChange = (val: number) => {
    if (a) {
      a.beloep = val;
      a.beloepError = validateRefusjon(a.beloep);
    }
    setAnsatte([...ansatte]);
  };

  return (
      <RefusjonInput
        feilmelding={a?.beloepError}
        beloep={a?.beloep}
        handleChange={handleChange}
        label={<div style={{ display: 'flex' }}>Beløp<HjelpetekstRefusjon /></div>}
      />
  )
};

export default BulkRefusjon;
