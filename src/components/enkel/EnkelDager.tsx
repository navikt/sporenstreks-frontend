import React, { useState } from 'react';
import { Normaltekst, Feilmelding } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import Vis from '../felles/Vis';
import DagerInput from '../dager/DagerInput';

interface EnkelDagerProps {
  index: number;
}

const antErrorState = {
  hasError: '',
  noError: 'tom'
}

const EnkelDager = (props: EnkelDagerProps) => {
  const { errors, setError, clearError } = useFormContext();
  const antId = 'antall_' + props.index;
  const [errorState, setErrorState] = useState(antErrorState.noError);

  const validateAntall = (value: string): boolean => {
    const numval = Number(value);
    let msg = '';
    if (value.length === 0) {
      msg = 'EnkelDager mangler.'
    } else {
      msg = numval < -1 && value !== '-' ? 'EnkelDager kan ikke være negativt' : '';
    }

    if (msg !== '') {
      setError(antId, msg);
      setErrorState(antErrorState.hasError)
      return false;
    } else {
      setErrorState(antErrorState.noError);
      clearError([ antId, 'backend' ]);
      return true;
    }
  };

  return (
    <>

      <Controller
        id={antId}
        name={antId}
        as={
          <DagerInput handleChange={e => validateAntall(e.target.value)} antallDagerMedRefusjon={13} id={antId} />
        }
      />
      <Normaltekst tag='div' role='alert' aria-live='assertive'
        className={`skjemaelement__feilmelding ${errorState} antall_${props.index}`}
      >

      </Normaltekst>
    </>
  );
};

export default EnkelDager;
