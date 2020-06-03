import React from 'react';
import { Select } from 'nav-frontend-skjema';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattID } from '../../data/types/sporenstreksTypes';
import { HjelpetekstDager } from './HjelpetekstDager';
import { validateNotNullAndPositive } from '../validering/validateNotNullAndPositive';

export const Dager = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id);
  const handleChange = (evt) => {
    if (a) {
      a.antallDagerMedRefusjon = parseInt(evt.target.selectedIndex);
      a.dagerError = validateNotNullAndPositive(a.antallDagerMedRefusjon);
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

export default Dager;
