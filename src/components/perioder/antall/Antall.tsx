import React, { useRef, useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from "react-number-format";
import Vis from '../../Vis';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

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
  const refAntId = useRef(null);
  const [errorState, setErrorState] = useState(antErrorState.noError);

  const validateAntall = (value: string): boolean => {
    const numval = Number(value);
    const msg = numval <= 0 ? 'Antall må være minst 1' : '';
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
    <div className="skjemaelement">
      <label htmlFor={antId} className="dager skjemaelement__label">
        <Normaltekst tag="span">
          Antall arbeidsdager dere vil ha refundert
        </Normaltekst>
      </label>
      <Controller
        id={antId}
        name={antId}
        as={
          <NumberFormat
            label=""
            thousandSeparator={' '}
            decimalScale={0}
            fixedDecimalScale={true}
            autoComplete={'off'}
            className={'skjemaelement__input input--s'}
            onBlur={e => validateAntall(e.target.value)}
          />
        }
      />
      <Hjelpetekst>
        <ul>
          <li>
            Her teller du dagene arbeidstakeren skulle vært på jobb fra dag 4 til dag 16 i sykefraværet.
            Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.
          </li>
          <li>Var noen av fraværsdagene før 16. mars, kan du ikke ta dem med.</li>
        </ul>
      </Hjelpetekst>

      <Normaltekst tag='div' role='alert' aria-live='assertive'
        ref={refAntId}
        className={`skjemaelement__feilmelding ${errorState} antall_${props.index}`}
      >
        <Vis hvis={errors[antId]}>
          <span>{errors[antId] && errors[antId].type}</span>
        </Vis>
      </Normaltekst>
    </div>
  );
};

export default Antall;
