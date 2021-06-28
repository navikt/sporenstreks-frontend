import React from 'react';
import { Select } from 'nav-frontend-skjema';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import validateDager from '../dager/validateDager';
import { AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';

export const BulkDager = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useBulk();
  const aktuellAnsatt = ansatte.find((ansatt) => ansatt.id === props.id);
  const handleChange = (evt) => {
    if (aktuellAnsatt) {
      aktuellAnsatt.antallDagerMedRefusjon = parseInt(evt.target.selectedIndex);
      aktuellAnsatt.dagerError = validateDager(
        aktuellAnsatt.antallDagerMedRefusjon
      );
    }
    setAnsatte([...ansatte]);
  };
  const optionArr = Array.from(Array(14).keys());
  return (
    <Select
      id={'dager_' + props.id}
      placeholder='Antall dager'
      feil={aktuellAnsatt?.dagerError}
      onChange={handleChange}
      label={
        <div style={{ display: 'flex' }}>
          Antall dager:
          <HjelpetekstDager />
        </div>
      }
      value={aktuellAnsatt?.antallDagerMedRefusjon}
      selected={aktuellAnsatt?.antallDagerMedRefusjon}
    >
      {optionArr.map((optionValue) => (
        <option key={optionValue} value={optionValue}>
          {optionValue ? optionValue : '-'}
        </option>
      ))}
    </Select>
  );
};

export default BulkDager;
