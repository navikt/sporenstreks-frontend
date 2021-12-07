import React, { useEffect, useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import validateDager from './validateDager';
import { HjelpetekstDager } from './HjelpetekstDager';
import { v4 as uuidv4 } from 'uuid';
import antallRefusjonsdager from './antallRefusjonsdager';

interface DagerInputProps {
  feilmelding?: string;
  antallDagerMedRefusjon?: number;
  handleChange: any;
  id?: number | string;
  startdato: Date;
}

export const DagerInput = ({
  feilmelding,
  antallDagerMedRefusjon,
  handleChange,
  id,
  startdato
}: DagerInputProps) => {
  const [lokalFeil, setLokalFeil] = useState<string | undefined>();
  const valgbareDager = antallRefusjonsdager(startdato);
  const optionArr = Array.from(Array(valgbareDager + 1).keys());

  const handleDagerBlur = (evt) => {
    const feilmelding = validateDager(evt.target.value);
    setLokalFeil(feilmelding);
  };

  useEffect(() => {
    setLokalFeil(feilmelding);
  }, [feilmelding]);

  const componentId = String(id) || 'dager_'.concat(uuidv4());

  const feilmeldingstekst = feilmelding ? feilmelding : lokalFeil;

  return (
    <Select
      id={componentId}
      feil={feilmeldingstekst}
      onChange={handleChange}
      onBlur={handleDagerBlur}
      name={componentId}
      placeholder={'Dager'}
      label={
        <div style={{ display: 'flex' }}>
          Antall dager:
          <HjelpetekstDager />
        </div>
      }
      selected={antallDagerMedRefusjon}
    >
      {optionArr.map((optionValue) => (
        <option key={optionValue} value={optionValue}>
          {optionValue ? optionValue : '-'}
        </option>
      ))}
    </Select>
  );
};

export default DagerInput;
