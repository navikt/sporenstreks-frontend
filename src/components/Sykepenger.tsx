import React, { useEffect, useReducer, useState } from 'react';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import NumberFormat from 'react-number-format';
import { ErrorType, RefusjonsKrav } from '../store/types/sporenstreksTypes';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { Knapp } from 'nav-frontend-knapper';
import { dateToString } from "../util/dateToString";
import AlertStripe from "nav-frontend-alertstriper";
import Perioder from './Perioder';
import { filterStringToNumbersOnly } from '../util/filterStringToNumbersOnly';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import { helseSpionReducer, initialHelseSpionState } from '../store/reducers/helseSpionReducers';
import dayjs from 'dayjs';
import { fetchArbeidsgivere } from '../store/thunks/fetchArbeidsgivere';
import { submitRefusjon } from '../store/thunks/submitRefusjon';
import './Sykepenger.less';

const Sykepenger = () => {
  const [ state ] = useReducer(helseSpionReducer, initialHelseSpionState);
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const [ amountInput, setAmountInput ] = useState<string>('');

  const { t } = useTranslation();
  const { history } = useHistory();

  useEffect(() => {
    fetchArbeidsgivere();
  }, []);

  const filterIdentityNumberInput = (input: string) => {
    setIdentityNumberInput(filterStringToNumbersOnly(input, 11));
  };

  const formToJSON = elms =>
    [].reduce.call(elms, (data: any, elm: any) => {
      data[elm.name] = elm.value;
      return data;
    }, {});

  const onSubmit = (e: any): void => {
    e.preventDefault();
    const form: HTMLFormElement = e.target;
    const data = formToJSON(form.elements);
    console.log('data', data); // eslint-disable-line

    // todo: validering av inputs
    const refusjonsKrav: RefusjonsKrav = {
      identitetsnummer: identityNumberInput,
      virksomhetsnummer: arbeidsgiverId,
      perioder: [
        {
          fom: dateToString(dayjs('2020-03-03').toDate()),
          tom: dateToString(dayjs('2020-03-18').toDate()),
          antallDagerMedRefusjon: parseInt('5'),
        }
      ],
      beloep: parseInt(amountInput)
    };
    submitRefusjon(refusjonsKrav);
  };

  const arbeidstaker = state.ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;

  if (arbeidstaker) {
    document.title = `${t(Keys.REFUNDS)}/${arbeidstaker.fornavn} ${arbeidstaker.etternavn} - www.nav.no`;
  } else {
    document.title = `${t(Keys.DOCUMENT_TITLE)}/${t(Keys.REFUNDS)} - www.nav.no`;
  }

  return (
    <div className="sykepenger">
      <Bedriftsmeny
        history={history}
        onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
        sidetittel={t(Keys.MY_PAGE)}
        organisasjoner={state.arbeidsgivere}
      />
      <div className="limit">
        <form className="sporsmal__form" onSubmit={(e) => onSubmit(e)}>
          <div className="container">
            {
              state.refusjonErrors?.map(error => error.errorType in ErrorType
                ? <AlertStripe type="feil">{t(error.errorType)}</AlertStripe>
                : <AlertStripe type="feil">{error.errorMessage}</AlertStripe>
              )
            }
            <div className="sykepenger--arbeidstaker">
              <Undertittel className="sykepenger--undertittel">
                Hvilken arbeidstaker gjelder søknaden?
              </Undertittel>
              <Input name="fnr"
                label="Fødselsnummer til arbeidstaker"
                bredde="M"
                onChange={e => filterIdentityNumberInput(e.target.value)}
                value={identityNumberSeparation(identityNumberInput)}
              />
            </div>
          </div>

          <div className="container">
            <div className="sykepenger--periode-velger form-group">
              <Undertittel className="sykepenger--undertittel">
                Hvilken periode har den ansatte vært fraværende?
              </Undertittel>
              <Undertekst className="sykepenger--undertekst">
                NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar
              </Undertekst>
              <Perioder id="perioder" />
            </div>
          </div>

          <div className="container">
            <Undertittel className="sykepenger--undertittel">Hvor mye ønskes refundert?</Undertittel>
            <label htmlFor="belop" className="skjemaelement__label">
              <Normaltekst tag="span">Beløp</Normaltekst>
            </label>
            <NumberFormat
              name="belop"
              id="belop"
              label=""
              value={amountInput}
              customInput={Input}
              format={'### ### ### ###'}
              className="input--s"
              onChange={e => setAmountInput(e.target.value)}
            />
          </div>

          <div className="container">
            <Knapp type="hoved"> Send refusjonssøknad </Knapp>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sykepenger;
