import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattID } from '../../data/types/sporenstreksTypes';
import { validateMaksBeloep } from '../refusjon/validateMaksBeloep';
import { RefusjonInput } from '../refusjon/RefusjonInput';
import EksempelBulk from '../refusjon/HjelpetekstRefusjon';

export const BulkRefusjon = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id);

  const handleChange = (val: number) => {
    if (a) {
      a.beloep = val;
      a.beloepError = validateMaksBeloep(a.beloep);
    }
    setAnsatte([...ansatte]);
  };

  return (
      <RefusjonInput
        feilmelding={a?.beloepError}
        beloep={a?.beloep}
        handleChange={handleChange}
        label={
          <div style={{ display: 'flex' }}>
            Beløp
            <EksempelBulk />
          </div>} />)
};

export default BulkRefusjon;
