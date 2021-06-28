import React from 'react';
import { FnrInput } from 'nav-frontend-skjema';
import { filterIdentityNumberInput } from '../fnr/filterIndentityNumberInput';
import { validateAnsatteFnr } from './validateAnsatteFnr';
import { AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';

export const BulkFnr = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte } = useBulk();
  const aktuellAnsatt = ansatte.find((ansatt) => ansatt.id === id);
  const handleChange = (evt) => {
    if (aktuellAnsatt) {
      aktuellAnsatt.fnr = filterIdentityNumberInput(evt.target.value);
      aktuellAnsatt.fnrError = validateAnsatteFnr(ansatte, aktuellAnsatt);
    }
    setAnsatte([...ansatte]);
  };

  return (
    <FnrInput
      id={'fnr_' + id}
      label={<div style={{ display: 'flex' }}>Fødselsnummer:</div>}
      bredde='M'
      value={aktuellAnsatt?.fnr}
      placeholder='11 siffer'
      onChange={handleChange}
      onValidate={() => {
        // This is intentional
      }}
      feil={aktuellAnsatt?.fnrError}
    />
  );
};
