import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from "react-number-format";
import Vis from '../Vis';
import Hjelpetekst from 'nav-frontend-hjelpetekst';

interface AntallProps {
  index: number;
}

const Antall = (props: AntallProps) => {
  const { errors, setError, clearError } = useFormContext();
  const antId = 'antall_' + props.index;

  const validateAntall = (value: string): boolean => {
    const errbox = document.querySelector('.' + antId)!;
    const numval = Number(value);
    const msg = numval <= 0 ? 'Antall må være minst 1' : '';
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(antId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([ antId, 'backend' ]);
      return true;
    }
  };

  return (
    <div className="inputelement">
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
            fixedDecimalScale
            autoComplete={'off'}
            className={'skjemaelement__input input--xs'}
            onBlur={e => validateAntall(e.target.value)}
            allowNegative={false}
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
        className={'skjemaelement__feilmelding tom antall_' + props.index}
      >
        <Vis hvis={errors[antId]}>
          <span>{errors[antId] && errors[antId].type}</span>
        </Vis>
      </Normaltekst>
    </div>
  );
};

export default Antall;
