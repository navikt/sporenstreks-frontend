import React, { useEffect, useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import { validateNotNullAndPositive } from './validateNotNullAndPositive';
import { HjelpetekstDager } from './HjelpetekstDager';
import uuid from 'uuid/v4';

interface DagerInputProps {
  feilmelding?: string,
  antallDagerMedRefusjon?: number,
  handleChange: any,
  id?: number | string
}

 const validateDager = (dager?: string): string | undefined => {
  if (dager === undefined || dager == '-1') {
    return 'Må fylles ut';
  }
  return undefined;
}

export const DagerInput = ({ feilmelding, antallDagerMedRefusjon, handleChange, id }: DagerInputProps) => {
  const [lokalFeil, setLokalFeil] = useState<string | undefined>();
  const optionArr = Array.from(Array(15).keys());

  const handleDagerBlur = (evt) => {
    const feilmelding = validateDager(evt.target.value);
    setLokalFeil(feilmelding)
  };

  useEffect(() => {
    setLokalFeil(feilmelding);
  }, [feilmelding])

  const componentId = String(id) || 'dager_'.concat(uuid());

  const feilmeldingstekst = feilmelding ? feilmelding : lokalFeil;

  return <Select
    id={componentId}
    feil={feilmeldingstekst}
    onChange={handleChange}
    onBlur={handleDagerBlur}
    name={componentId}
    label={
      <div style={{ display: 'flex' }}>
        Antall dager:
        <HjelpetekstDager/>
      </div>}
    selected={antallDagerMedRefusjon}>
    {
      optionArr.map(optionValue => <option key={optionValue} value={optionValue - 1}>
        {optionValue ? (optionValue-1) : '-'}
      </option>)
    }
  </Select>
};

export default DagerInput;
