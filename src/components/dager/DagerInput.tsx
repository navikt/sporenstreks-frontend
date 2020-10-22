import React, { useEffect, useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import validateDager from './validateDager';
import { HjelpetekstDager } from './HjelpetekstDager';
import { v4 as uuidv4 } from 'uuid';

interface DagerInputProps {
  feilmelding?: string,
  antallDagerMedRefusjon?: number,
  handleChange: any,
  id?: number | string
}

export const DagerInput = ({ feilmelding, antallDagerMedRefusjon, handleChange, id }: DagerInputProps) => {
  const [lokalFeil, setLokalFeil] = useState<string | undefined>();
  const optionArr = Array.from(Array(15).keys());

  const handleDagerBlur = (evt: React.MouseEvent) => {
    const feilmelding = validateDager(evt.target.value);
    setLokalFeil(feilmelding)
  };

  useEffect(() => {
    setLokalFeil(feilmelding);
  }, [feilmelding])

  const componentId = String(id) || 'dager_'.concat(uuidv4());

  const feilmeldingstekst = feilmelding ? feilmelding : lokalFeil;

  return <Select
    id={componentId}
    feil={feilmeldingstekst}
    onChange={handleChange}
    onBlur={handleDagerBlur}
    name={componentId}
    placeholder={'Dager'}
    label={
      <div style={{ display: 'flex' }}>
        Antall dager:
        <HjelpetekstDager/>
      </div>}
    selected={antallDagerMedRefusjon}>
    {
      optionArr.map(optionValue => <option key={optionValue} value={optionValue - 1}>
        {optionValue ? (optionValue-1) : undefined}
      </option>)
    }
  </Select>
};

export default DagerInput;
