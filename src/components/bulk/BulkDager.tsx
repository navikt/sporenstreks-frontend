import React from 'react';
import { Select } from 'nav-frontend-skjema';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import validateDager from '../dager/validateDager';
import { AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';

export const BulkDager = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useBulk();
  const a = ansatte.find(a => a.id === props.id);
  const handleChange = (evt: React.MouseEvent) => {
    if (a) {
      a.antallDagerMedRefusjon = parseInt(evt.target.selectedIndex);
      a.dagerError = validateDager(a.antallDagerMedRefusjon);
    }
    setAnsatte([...ansatte]);
  };
  const optionArr = Array.from(Array(14).keys());
  return (
    <Select
      id={'dager_' + props.id}
      placeholder='Antall dager'
      feil={a?.dagerError}
      onChange={handleChange}
      label={
        <div style={{ display: 'flex' }}>
          Antall dager:
          <HjelpetekstDager/>
        </div>}
      value={a?.antallDagerMedRefusjon}
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
