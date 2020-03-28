import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import { Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import fnrvalidator from '@navikt/fnrvalidator';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { Knapp } from 'nav-frontend-knapper';
import Perioder from './Perioder';
import { filterStringToNumbersOnly } from '../util/filterStringToNumbersOnly';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import { submitRefusjon } from '../data/submitRefusjon';
import { useAppStore } from '../data/store/AppStore';
import { History } from 'history';
import dayjs from 'dayjs';
import './Sykepenger.less';
import Vis from './Vis';

const Sykepenger = () => {
  const { arbeidsgivere } = useAppStore();
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const [ idnrFeil, setIdnrFeil ] = useState<string>('');
  const { t } = useTranslation();
  const history: History = useHistory();

  const filterIdentityNumberInput = (input: string) => {
    setIdentityNumberInput(filterStringToNumbersOnly(input, 11));
  };

  const formToJSON = elms =>
    [].reduce.call(elms, (data: any, elm: any) => {
      data[elm.name] = elm.value;
      return data;
    }, {});

  const convertSkjemaToRefusjonsKrav = (data): RefusjonsKrav => {
    const antallPerioder = (Object.keys(data).length - 2) / 3;
    let perioder: Periode[] = [];

    for (let i = 0; i < antallPerioder; i++) {
      const days = data['periode_' + i].split(' til ');
      const periode: Periode = {
        fom: dayjs(days[0]).format('YYYY-MM-DD'),
        tom: dayjs(days[1]).format('YYYY-MM-DD'),
        antallDagerMedRefusjon: data['antall_' + i],
        beloep: data['beloep_' + i]
          .replace(/\s/g,'')
          .replace(',', '.'),
      };
      perioder.push(periode)
    }

    return {
      identitetsnummer: identityNumberInput,
      virksomhetsnummer: arbeidsgiverId,
      perioder: perioder
    };
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();
    const form: HTMLFormElement = document.querySelector('.refusjonsform') ?? e.target;
    const data = formToJSON(form.elements);
    console.log('form', form); // eslint-disable-line
    console.log('data', data); // eslint-disable-line
    submitRefusjon(convertSkjemaToRefusjonsKrav((data)));
  };

  document.title = `${t(Keys.DOCUMENT_TITLE)}/${t(Keys.REFUNDS)} - www.nav.no`;

  const validateFnr = (value: string) => {
    value = value.replace(/-/g, '');
    const res: any = fnrvalidator.fnr(value);
    console.log('res', res); // eslint-disable-line
    if (res.status !== 'valid') {
      setIdnrFeil(res.status === 'invalid' ? 'Ugyldig fødselsnummer': 'Noe annet');
    }
  };

  return (
    <div className="sykepenger">
      <Bedriftsmeny
        history={history}
        onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
        sidetittel={t(Keys.MY_PAGE)}
        organisasjoner={arbeidsgivere}
      />
      <div className="limit">
        <form className="refusjonsform" onSubmit={(e) => onSubmit(e)}>
          <div className="container">
            {/*
            {
              state.refusjonErrors?.map(error => error.errorType in ErrorType
                ? <AlertStripe type="feil">{t(error.errorType)}</AlertStripe>
                : <AlertStripe type="feil">{error.errorMessage}</AlertStripe>
              )
            }
*/}
            <div className="sykepenger--arbeidstaker">
              <Undertittel className="sykepenger--undertittel">
                Hvilken arbeidstaker gjelder søknaden?
              </Undertittel>
              <Input name="fnr"
                label="Fødselsnummer til arbeidstaker"
                bredde="M"
                autoComplete={'off'}
                onChange={e => filterIdentityNumberInput(e.target.value)}
                onBlur={e => validateFnr(e.target.value)}
                value={identityNumberSeparation(identityNumberInput)}
              />
            </div>
            <Normaltekst tag='div' role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
              <Vis hvis={idnrFeil}>
                {idnrFeil}
              </Vis>
            </Normaltekst>
          </div>

          <div className="container">
            <div className="sykepenger--periode-velger form-group">
              <Undertittel className="sykepenger--undertittel">
                Hvilken periode har den ansatte vært fraværende?
              </Undertittel>
              <Undertekst className="sykepenger--undertekst">
                NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar
              </Undertekst>
              <Perioder />
            </div>
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
