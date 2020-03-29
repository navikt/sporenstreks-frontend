import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { FormContext, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import { Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import fnrvalidator from '@navikt/fnrvalidator';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import Perioder from './periode/Perioder';
import { filterStringToNumbersOnly } from '../util/filterStringToNumbersOnly';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import FeilOppsummering from './feilvisning/FeilOppsummering';
import { useAppStore } from '../data/store/AppStore';
import { History } from 'history';
import dayjs from 'dayjs';
import './Sykepenger.less';
import Vis from './Vis';

const Sykepenger = () => {
  const { arbeidsgivere } = useAppStore();
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const methods = useForm();
  const { t } = useTranslation();
  const history: History = useHistory();

  const backendErrorsToErrors = () => {
    methods.setError('fieldName', 'errorMessage');
  };

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
          .replace(/\s/g, '')
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

  const onSubmit = async(e: any): Promise<void> => {
    const form: HTMLFormElement = document.querySelector('.refusjonsform') ?? e.target;
    const data = formToJSON(form.elements);
    const refusjonsKrav = convertSkjemaToRefusjonsKrav(data);
    await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/refusjonskrav', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(refusjonsKrav),
    }).then(response => {
      if (response.status === 401) {
        history.push(process.env.REACT_APP_LOGIN_SERVICE_URL ?? '');
      } else if (response.status === 200) {
        console.log('mottatt'); // todo: vis kvittering
      } else if (response.status === 422) {
        response.json().then(data => {
          data.violations.map(violation => {
            methods.setError('backend', violation.message);
          });
          data.violations.map(violation => ({
            errorType: violation.validationType,
            errorMessage: violation.message,
          }));
        });
      } else { // todo: error 400
        methods.setError('backend', 'Feil ved innsending av skjema');
      }
    });
  };

  const validateFnr = (value: string) => {
    const errbox = document.querySelector('.fnr')!;
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
    methods.setError('fnr', msg);
    if (msg !== '') {
      errbox.classList.remove('tom');
      return false;
    } else {
      errbox.classList.add('tom');
      return true;
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
        <FormContext {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="refusjonsform">
            <div className="container">
              <div className="sykepenger--arbeidstaker">
                <Undertittel className="sykepenger--undertittel">
                  Hvilken arbeidstaker gjelder søknaden?
                </Undertittel>
                <Input
                  id="fnr"
                  name="fnr"
                  label="Fødselsnummer til arbeidstaker"
                  bredde="M"
                  autoComplete={'off'}
                  onChange={e => filterIdentityNumberInput(e.target.value)}
                  onBlur={e => validateFnr(e.target.value)}
                  value={identityNumberSeparation(identityNumberInput)}
                />
              </div>

              <Normaltekst tag='div' role='alert' aria-live='assertive'
                className={'skjemaelement__feilmelding tom fnr'}
              >
                <Vis hvis={methods.errors['fnr']}>
                  <span>{methods.errors['fnr'] && methods.errors['fnr'].type}</span>
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

            <FeilOppsummering errors={methods.errors} />

            <div className="container">
              <Knapp type="hoved"> Send refusjonssøknad </Knapp>
            </div>
          </form>
        </FormContext>
      </div>
    </div>
  );
};

export default Sykepenger;
