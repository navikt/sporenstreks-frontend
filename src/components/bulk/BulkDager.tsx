import React from 'react';
import { Select } from 'nav-frontend-skjema';
import { useAppStore } from '../../data/store/AppStore';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import validateDager from '../dager/validateDager';
import { AnsattID } from './Ansatt';

export const BulkDager = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id);
  const handleChange = (evt) => {
    if (a) {
      a.antallDagerMedRefusjon = parseInt(evt.target.selectedIndex);
      a.dagerError = validateDager(a.antallDagerMedRefusjon);
    }
    setAnsatte([...ansatte]);
  };
  const optionArr = Array.from(Array(14).keys());
  return (
    <Select
      feil={a?.dagerError}
      onChange={handleChange}
      label={
        <div style={{ display: 'flex' }}>
          Antall dager:
          <HjelpetekstDager/>
        </div>}
      selected={a?.antallDagerMedRefusjon}>
      {
        optionArr.map(optionValue => <option key={optionValue} value={optionValue}>
          {optionValue ? optionValue : '-'}
        </option>)
      }
    </Select>
  )
};

export default BulkDager;
