import React from 'react';
import { FnrInput } from 'nav-frontend-skjema';
import { filterIdentityNumberInput } from '../fnr/filterIndentityNumberInput';
import { validateAnsatteFnr } from './validateAnsatteFnr';
import { AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';

export const BulkFnr = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte } = useBulk();
  const a = ansatte.find((a) => a.id === id);
  const handleChange = (evt) => {
    if (a) {
      a.fnr = filterIdentityNumberInput(evt.target.value);
      a.fnrError = validateAnsatteFnr(ansatte, a);
    }
    setAnsatte([...ansatte]);
  };

  return (
    <FnrInput
      id={'fnr_' + id}
      label={<div style={{ display: 'flex' }}>Fødselsnummer:</div>}
      bredde='M'
      value={a?.fnr}
      placeholder='11 siffer'
      onChange={handleChange}
      onValidate={() => {}}
      feil={a?.fnrError}
    />
  );
};
