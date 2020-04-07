import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import fnrvalidator from '@navikt/fnrvalidator';
import { identityNumberSeparation } from '../../util/identityNumberSeparation';
import { useFormContext } from 'react-hook-form';
import { useAppStore } from '../../data/store/AppStore';
import { filterStringToNumbersOnly } from '../../util/filterStringToNumbersOnly';
import Vis from '../Vis';

interface FnrProps {
  index?: number;
}

const FodselNr = (props: FnrProps) => {
  const { errors, setError, clearError } = useFormContext();
  const { identityNumberInput, setIdentityNumberInput } = useAppStore();
  const fnrId = props.index ? 'fnr_' + props.index : 'fnr';

  const filterIdentityNumberInput = (input: string) => {
    setIdentityNumberInput(filterStringToNumbersOnly(input, 11));
  };

  const validateFnr = (value: string) => {
    const errbox = document.querySelector('.' + fnrId)!;
    value = value.replace(/-/g, '');
    const notValid = fnrvalidator.fnr(value).status === 'invalid';
    let msg = '';
    if (value === '') {
      msg = 'Fødselsnummer må fylles ut'
    } else if (value.length < 11) {
      msg = 'Fødselsnummer må ha 11 siffer';
    } else if (notValid) {
      msg = 'Fødselsnummer er ugyldig'
    }
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(fnrId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([ fnrId, 'backend' ]);
      return true;
    }
  };

  return (
    <div className="inputelement">
      <Vis hvis={props.index === undefined}>
        <Undertittel className="sykepenger--undertittel">
          Hvilken arbeidstaker gjelder søknaden?
        </Undertittel>
      </Vis>
      <Input
        id={fnrId}
        name={fnrId}
        label="Fødselsnummer til arbeidstaker"
        bredde="M"
        autoComplete={'off'}
        onChange={e => filterIdentityNumberInput(e.target.value)}
        onBlur={e => validateFnr(e.target.value)}
        value={identityNumberSeparation(identityNumberInput)}
      />

      <Normaltekst tag='div' role='alert' aria-live='assertive'
        className={'skjemaelement__feilmelding tom ' + fnrId}
      >
        <Vis hvis={errors[fnrId]}>
          <span>{errors[fnrId] && errors[fnrId].type}</span>
        </Vis>
      </Normaltekst>
    </div>
  );
};

export default FodselNr;
