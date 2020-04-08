import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from "react-number-format";
import Vis from '../Vis';
import { Keys } from '../../locales/keys';
import { useTranslation } from 'react-i18next';
import ModalWrapper from 'nav-frontend-modal';
import './Beloep.less';
import Veilederpanel from 'nav-frontend-veilederpanel';

interface BeloepProps {
  index: number;
}

const Beloep = (props: BeloepProps) => {
  const { errors, setError, clearError } = useFormContext();
  const [ amountInput, setAmountInput ] = useState<string>('');
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const belId = 'beloep_' + props.index;
  const { t } = useTranslation();

  const validateBeloep = (value: string): boolean => {
    value = value
      .replace(/\s/g, '')
      .replace(',', '.');
    const numval = Number(value);

    const errbox = document.querySelector('.' + belId)!;

    let msg = '';
    if (numval < 0) {
      msg = t(Keys.TOOLOWAMOUNT);
    }
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(belId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([belId, 'backend']);
      return true;
    }
  };

  return (
    <div className="skjemaelement">
      <ModalWrapper
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        closeButton={true}
        contentLabel="Eksempel visning"
        className="beloep-modal"
      >
        <Veilederpanel svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 93"><path fill="#e7e5e2" d="M14 50.7C15 52.3 17.9 81 26.5 81S39 51.8 39 50.3c-13.2-7.6-25 .4-25 .4z"/><path fill="#5c4378" d="M38.7 50.2c6 2.9 15.3 10.9 15.3 18.3V93H0V68.5c0-7.1 8.5-14.8 14.5-18-.3.2-.5.3-.5.3 1 1.7 3.8 9.2 12.4 9.2C35 60 39 51.9 39 50.4c-.1-.1-.2-.2-.3-.2z"/><path fill="#d2242a" d="M46.7 76H31.2c-.7 0-1.3-.6-1.2-1.3v-8.5c0-.7.6-1.3 1.3-1.3h15.5c.7 0 1.3.6 1.3 1.3v8.5c-.1.7-.7 1.3-1.4 1.3"/><path fill="#fff" d="M42.9 71c0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8c2.1 0 3.8 1.7 3.8 3.8m-8.7 1.7h-.7l.8-1.9h.7l-.8 1.9zm9.3 0H43l.8-1.9h.5l-.8 1.9zm1.2 0h-.2l.8-1.9h.2l-.8 1.9z"/><path fill="#c52d35" d="M36.2 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.6s-.1 0-.1.1l-.2.6v.1h.2l.1 1.2c0-.1 0 0 0 0"/><path fill="#c52d35" d="M37.5 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.9s-.1 0-.1.1l-.2.6-.1.1h.5c.1 0 .2.1.2.2v1c-.1-.1-.1 0 0 0m2.6-1.9h-.6s-.1 0-.1.1v1.8s0 .1.1.1h.6s.1 0 .1-.1l.2-.6V72h-.2l-.1-1.2"/><path fill="#c52d35" d="M37.7 72.7h.4s.1 0 .1-.1l.2-.6v-.1h-.2c0 .1-.5.8-.5.8zm3.9-1.9h.7s.1 0 0 .1l-.7 1.8H41l.6-1.9"/><path fill="#c52d35" d="M40.8 70.8h-1c-.1 0 .3.1.3.1l.7 1.7s0 .1.1.1h.6l-.7-1.9m-1.3.6v.4s-.1-.4-.3-.4c-.3 0-.3.2-.3.3 0 .1.1.3.2.3h.5l-.3.7H39c-.2 0-.9-.3-.9-.9 0-.6.5-1 .9-1 .2-.1.5.2.5.6 0-.1 0-.1 0 0z"/><path fill="#5a1f57" d="M39.9 66.7h-1.6c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h1.6c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2"/><path fill="#c2b5cf" d="M38.7 66.5h.9V64h-.9v2.5z"/><path fill="#e7e5e2" d="M47.2 35.3C44.7 45.6 36.6 53.1 27 53.1S9.3 45.6 6.8 35.3c-.2.1-.5.1-.8.1-1.1 0-2-.8-2-1.7v-7c0-1 .9-1.7 2-1.7h.2C7.7 13.1 16.4 4 27 4c10.6 0 19.3 9.1 20.8 21h.2c1.1 0 2 .8 2 1.7v7c0 1-.9 1.7-2 1.7-.3 0-.5 0-.8-.1z"/><path fill="#635e59" d="M19 27.6c-1.4.1-1.9-2-1.4-3.4.1-.3.6-1.5 1.4-1.5.8 0 1.2.7 1.3.8.6 1.4.3 4-1.3 4.1m16.2 0c1.4.1 1.9-2 1.4-3.4-.1-.3-.6-1.5-1.4-1.5-.8 0-1.2.7-1.3.8-.6 1.4-.3 4 1.3 4.1"/><path fill="#d1bfa3" d="M26.8 34.6c-.4 0-.7-.1-1-.2-.3-.1-.4-.4-.3-.7.1-.3.4-.4.7-.3.5.2 1.5.1 2.2-.4.7-.4 1.1-1 1.2-1.5.1-.4-.1-.9-.4-1.3-.2-.2-.8-.2-1.6-.1-.3 0-.5-.1-.6-.4 0-.3.1-.5.4-.6 1.2-.2 2.1 0 2.6.6.5.7.8 1.4.6 2.1-.1.8-.7 1.6-1.7 2.2-.6.3-1.4.6-2.1.6z"/><path fill="#593a32" d="M27.1 42.1h-.3c-5.3-.2-7.3-4.1-7.4-4.3-.1-.3 0-.6.2-.7.2-.1.6 0 .7.2.1.1 1.9 3.6 6.6 3.8 4.7.2 6.4-3.7 6.4-3.7.1-.3.4-.4.7-.3.3.1.4.4.3.7-.1 0-2.1 4.3-7.2 4.3z"/><path fill="#f6b873" d="M6.6 30.7c.1-.1.1-.2.1-.3v-2c-.1-5.6 1.8-8.1 3.4-10.1 0 0-1 4.3-.3 3.4 3.8-5 21.4-1.6 25-8.1.5 3.6-4.1 4.6-4.1 4.6 3.7.7 6.9-.8 7.7-2.5.3 1.4-.6 2.4-1.9 3.4 4.5-.9 4.6-4 4.6-4 .6 4.1 5.3 2.5 5.3 9.3v6c0 .3.2.6.5.6h.5c.3 0 .5-.3.5-.6V26c.3-15.6-8.5-26-20.6-26C15.9 0 5 10.4 5 24.1v6.3c0 .4.2.6.5.6h.6c.2 0 .3-.1.5-.3"/><path fill="#f6b873" d="M25.9 43.4c-4.4 0-8-1.4-8-3.2s3.6-3.2 8-3.2 8 1.4 8 3.2c0 1.8-3.6 3.2-8 3.2m.8-9.4c-2.9 0-4.7.7-8.8 2.1-12.7 4.6-11.6-14-11.6-14C3.4 46 18.6 52 26.5 52c8.1 0 24.1-8.1 21-30 0 0 .4 17.1-12.9 13.8-3.7-.9-5-1.8-7.9-1.8z"/></svg>} // eslint disable-line
        >
          <b>Slik finner dere beløpet dere kan kreve:</b><br/><br/>
          1. Beregn månedsinntekten slik det ellers gjøres for sykepenger i arbeidsgiverperioden.<br/>
          2. Gang med 12 måneder for å finne årslønn.<br/>
          3. Reduser beløpet til 6G (=599 148) hvis beløpet er over dette.<br/>
          4. Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.<br/>
          5. Trekk fra de tre første dagene, og krev refusjon fra og med dag 4, men maksimalt 13 dager til sammen.
          Dager før 16. mars får du ikke refusjon for.<br/>
          6. Gang dagsatsen med antall dager dere krever refusjon for.<br/><br/>
          <b>Eksempel:</b><br/>
          <ul>
            <li>
              Frida har første fraværsdag 20. mars. Hun jobber mandag-fredag og får ikke utbetalt lønn for helgedager.
            </li>
            <li>Arbeidsgiverperioden går til og med 4. april</li>
            <li>
              Trekk fra helgedager og de tre første dagene i arbeidsgiverperioden =
              10 dager som det kan kreves refusjon for.
            </li>
            <li>Gang med 12 = 660 000 i årslønn</li>
            <li>Reduser beløpet til 6G = 599 148</li>
            <li>Del på 260 (antallet arbeidsdager Frida jobber i året) = 2 304 kroner pr dag (dagsats)</li>
            <li>Gang dagsatsen med 10 = 23 040 kroner</li>
          </ul>
          <button role="link" className="periodeknapp lenke" onClick={() => setModalOpen(false)}>
            Lukk dette vinduet
          </button>
        </Veilederpanel>
      </ModalWrapper>
      <label htmlFor={belId} className="skjemaelement__label">
        <Normaltekst tag="span">Brutto beløp som søkes refundert</Normaltekst>
      </label>
      <button role="link" className="periodeknapp lenke" onClick={() => setModalOpen(true)}>
        Se eksempel på utregning
      </button>
      <Controller
        name={belId}
        id={belId}
        as={
          <NumberFormat
            label=""
            value={amountInput}
            thousandSeparator={' '}
            decimalSeparator={','}
            decimalScale={2}
            fixedDecimalScale={true}
            autoComplete={'off'}
            className={'skjemaelement__input input--m'}
            onBlur={e => validateBeloep(e.target.value)}
            onChange={e => setAmountInput(e.target.value)}
          />
        }
      />

      <Normaltekst tag='div' role='alert' aria-live='assertive'
        className={'skjemaelement__feilmelding tom beloep_' + props.index}
      >
        <Vis hvis={errors[belId]}>
          <span>{errors[belId] && errors[belId].type}</span>
        </Vis>
      </Normaltekst>
    </div>
  );
};

export default Beloep;
