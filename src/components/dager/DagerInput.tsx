import React from 'react';
import { Select } from 'nav-frontend-skjema';
import { useAppStore } from '../../data/store/AppStore';
import { validateNotNullAndPositive } from '../validering/validateNotNullAndPositive';
import { HjelpetekstDager } from '../ansatte/HjelpetekstDager';

interface DagerInputProps {
  id: number | string
}

export const DagerInput = ({id}: DagerInputProps) => {
  const {ansatte, setAnsatte} = useAppStore();
  const a = ansatte.find(a => a.id === id);
  const handleChange = (evt) => {
    if (a) {
      a.antallDagerMedRefusjon = parseInt(evt.target.selectedIndex);
      a.dagerError = validateNotNullAndPositive(a.antallDagerMedRefusjon);
    }
    setAnsatte([...ansatte]);
  };
  const optionArr = Array.from(Array(14).keys());

  return <Select
    feil={a?.dagerError}
    onChange={handleChange}
    label={
      <div style={{display: 'flex'}}>
        Antall dager
        <HjelpetekstDager/>
      </div>}
    selected={a?.antallDagerMedRefusjon}>
    {
      optionArr.map(optionValue => <option key={optionValue} value={optionValue}>
        {optionValue ? optionValue : '-'}
      </option>)
    }
  </Select>

};
