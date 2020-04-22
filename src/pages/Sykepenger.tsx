import React, { useState, useRef } from 'react';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { FormContext, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import fnrvalidator from '@navikt/fnrvalidator';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import Perioder from '../components/perioder/Perioder';
import { filterStringToNumbersOnly } from '../util/filterStringToNumbersOnly';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import FeilOppsummering from '../components/feilvisning/FeilOppsummering';
import { useAppStore } from '../data/store/AppStore';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { History } from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import './Sykepenger.less';
import Lenke from "nav-frontend-lenker";
import ModalWrapper from 'nav-frontend-modal';
import Eksempel from '../components/Eksempel';
import formToJSON from '../util/formToJSON';
import convertSkjemaToRefusjonsKrav from '../util/convertSkjemaToRefusjonsKrav';
import { Erklaring } from '../components/ansatte/Erklaring';

const fnrErrorState = {
  hasError: '',
  noError: 'tom'
}

const Sykepenger = () => {
  const { arbeidsgivere, setReferanseNummer } = useAppStore();
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const [ firma, setFirma ] = useState<string>('');
  const [ sendSkjemaOpen, setSendSkjemaOpen ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<any>({});
  const [ fnrClassName, setFnrClassName ] = useState<string>(fnrErrorState.noError);
  const methods = useForm();
  const { t } = useTranslation();
  const history: History = useHistory();
  const refRefusjonsform = useRef(null);

  const filterIdentityNumberInput = (input: string) => {
    setIdentityNumberInput(filterStringToNumbersOnly(input, 11));
  };

  const setForm = (e: any) => {
    const form = refRefusjonsform.current ?? e.target;

    setFormData(formToJSON(form.elements));
    setSendSkjemaOpen(true);
  };

  const submitForm = async(): Promise<void> => {
    const refusjonsKrav = convertSkjemaToRefusjonsKrav(formData, identityNumberInput, arbeidsgiverId);
    setSendSkjemaOpen(false);

    const FETCH_TIMEOUT = 5000;
    let didTimeOut = false;

    new Promise((resolve, reject) => {
      const timeout = setTimeout(function() {
        didTimeOut = true;
        reject(new Error('Request timed out'));
      }, FETCH_TIMEOUT);

      fetch(env.baseUrl + '/api/v1/refusjonskrav', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(refusjonsKrav),
      }).then((response: Response) => {
        clearTimeout(timeout);
        if(!didTimeOut) {
          if (response.status === 401) {
            window.location.href = env.loginServiceUrl;
          } else if (response.status === 200) {
            response.json().then(data => {
              setReferanseNummer(data.referansenummer);
              history.push('/kvittering')
            })
          } else if (response.status === 422) {
            response.json().then(data => {
              data.violations.forEach(violation => {
                methods.setError('backend', violation.message);
              });
              data.violations.map(violation => ({
                errorType: violation.validationType,
                errorMessage: violation.message,
              }));
            });
          } else { // todo: error 400
            methods.setError('backend', 'Server feil, prøv igjen senere');
          }
        }
      }).catch(err => {
        if(didTimeOut) return;
        reject(err);
      });
    }).catch(err => {
      methods.setError('backend', 'Server feil, prøv igjen senere');
    });
  };

  const validateFnr = (value: string) => {
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
      setFnrClassName(fnrErrorState.hasError)
      methods.setError('fnr', msg);
      return false;
    } else {
      setFnrClassName(fnrErrorState.noError);
      methods.clearError(['fnr', 'backend']);
      return true;
    }
  };

  return (
    <div className="sykepenger">
      <Vis hvis={arbeidsgivere.length === 0}>
        <div className="limit">
          <AlertStripeAdvarsel>
            <div>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</div>
            <div>Tildeling av roller foregår i Altinn</div>
            <Link to="/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
              className="lenke informasjonsboks__lenke"
            >
              Les mer om roller og tilganger.
            </Link>
          </AlertStripeAdvarsel>
        </div>
      </Vis>

      <ModalWrapper
        isOpen={sendSkjemaOpen}
        onRequestClose={() => setSendSkjemaOpen(false)}
        closeButton={true}
        contentLabel="Send skjema"
      >
        <Undertittel className="sykepenger__modal-tittel">Du søker om refusjon på vegne av:</Undertittel>
        <p className="sykepenger__modal-tekst">{firma}</p>
        <p className="sykepenger__modal-tekst">Organisasjonsnummer: {arbeidsgiverId}</p>
        <Knapp className="sykepenger__modal-btn" onClick={() => submitForm()}>Send søknad om refusjon</Knapp>
        <div className="sykepenger__modal-avbrytt lenke" onClick={() => setSendSkjemaOpen(false)}>
          Avbrytt
        </div>
      </ModalWrapper>
      <Vis hvis={arbeidsgivere.length > 0}>
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => {
            setArbeidsgiverId(org.OrganizationNumber);
            setFirma(org.Name);
          }}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="limit">
          <AlertStripeAdvarsel>
            En ny versjon av dette skjemaet er under utvikling. Der blir det mulig å søke om refusjon for flere ansatte
            samtidig.
          </AlertStripeAdvarsel>
          <div className="container">
            <Normaltekst>
              <b>NAV dekker dager fra og med 16 mars</b> i inntil 13 av de 16 dagene
              som arbeidsgiveren vanligvis betaler.
              Ordningen gjelder når den ansatte er smittet av koronaviruset,
              mistenkt smittet eller i pålagt karantene.
              Her kan dere søke om refusjon for dager fra og med 16. mars.
              <br/>
              <Lenke href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
                Du finner mer informasjon på denne siden.
              </Lenke>
            </Normaltekst>
          </div>
          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(setForm)} ref={refRefusjonsform}>
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
                  className={'skjemaelement__feilmelding fnr ' + fnrClassName }
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
                  <Eksempel/>
                  <Perioder/>

                </div>
              </div>

              <FeilOppsummering errors={methods.errors} />

              <div className="container">
                <div className="container">
                  {Erklaring(erklæringAkseptert, value => setErklæringAkseptert(value))}
                </div>
              </div>

              <div className="container">
                <Knapp disabled={!erklæringAkseptert} type="hoved"> Send søknad om refusjon </Knapp>
              </div>
            </form>
          </FormContext>
        </div>
      </Vis>
    </div>
  );
};

export default Sykepenger;
