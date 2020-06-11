import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import Vis from '../../Vis';
import DagerInput from '../../dager/DagerInput';

interface AntallProps {
  index: number;
}

const antErrorState = {
  hasError: '',
  noError: 'tom'
}

const Antall = (props: AntallProps) => {
  const { errors, setError, clearError } = useFormContext();
  const antId = 'antall_' + props.index;
  const [errorState, setErrorState] = useState(antErrorState.noError);

  const validateAntall = (value: string): boolean => {
    const numval = Number(value);
    let msg = '';
    if (value.length === 0) {
      msg = 'Antall mangler.'
    } else {
      msg = numval < 0 && value !== '-' ? 'Antall kan ikke være negativt' : '';
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
        <Vis hvis={errors[antId]}>
          <span>{errors[antId] && errors[antId].type}</span>
        </Vis>
      </Normaltekst>
    </>
  );
};

export default Antall;
