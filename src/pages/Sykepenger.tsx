import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { FormContext, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import { Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';
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
import Veilederpanel from 'nav-frontend-veilederpanel';

const Sykepenger = () => {
  const { arbeidsgivere, setReferanseNummer } = useAppStore();
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const [ firma, setFirma ] = useState<string>('');
  const [ sendSkjemaOpen, setSendSkjemaOpen ] = useState<boolean>(false);
  const [ eksempelOpen, setEksempelOpen ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<any>({});
  const methods = useForm();
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
        fom: days[0],
        tom: days[1] ?? days[0],
        antallDagerMedRefusjon: data['antall_' + i].replace(/ /g, ''),
        beloep: data['beloep_' + i].replace(/ /g, '')
          .replace(/\s/g, '')
          .replace(',', '.'),
      };
      console.log('days: ', days) // eslint-disable-line no-console

      perioder.push(periode)
    }

    return {
      identitetsnummer: identityNumberInput,
      virksomhetsnummer: arbeidsgiverId,
      perioder: perioder
    };
  };
  
  const setForm = (e: any) => {
    const form: HTMLFormElement = document.querySelector('.refusjonsform') ?? e.target;
    setFormData(formToJSON(form.elements));
    setSendSkjemaOpen(true);
  };

  const submitForm = async(): Promise<void> => {
    const refusjonsKrav = convertSkjemaToRefusjonsKrav(formData);
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
              data.violations.map(violation => {
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
    if (msg !== '') {
      errbox.classList.remove('tom');
      methods.setError('fnr', msg);
      return false;
    } else {
      errbox.classList.add('tom');
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
      <ModalWrapper
        isOpen={eksempelOpen}
        onRequestClose={() => setEksempelOpen(false)}
        closeButton={true}
        contentLabel="Eksempel visning"
      >
        <Veilederpanel svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 93"><path fill="#e7e5e2" d="M14 50.7C15 52.3 17.9 81 26.5 81S39 51.8 39 50.3c-13.2-7.6-25 .4-25 .4z"/><path fill="#5c4378" d="M38.7 50.2c6 2.9 15.3 10.9 15.3 18.3V93H0V68.5c0-7.1 8.5-14.8 14.5-18-.3.2-.5.3-.5.3 1 1.7 3.8 9.2 12.4 9.2C35 60 39 51.9 39 50.4c-.1-.1-.2-.2-.3-.2z"/><path fill="#d2242a" d="M46.7 76H31.2c-.7 0-1.3-.6-1.2-1.3v-8.5c0-.7.6-1.3 1.3-1.3h15.5c.7 0 1.3.6 1.3 1.3v8.5c-.1.7-.7 1.3-1.4 1.3"/><path fill="#fff" d="M42.9 71c0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8c2.1 0 3.8 1.7 3.8 3.8m-8.7 1.7h-.7l.8-1.9h.7l-.8 1.9zm9.3 0H43l.8-1.9h.5l-.8 1.9zm1.2 0h-.2l.8-1.9h.2l-.8 1.9z"/><path fill="#c52d35" d="M36.2 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.6s-.1 0-.1.1l-.2.6v.1h.2l.1 1.2c0-.1 0 0 0 0"/><path fill="#c52d35" d="M37.5 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.9s-.1 0-.1.1l-.2.6-.1.1h.5c.1 0 .2.1.2.2v1c-.1-.1-.1 0 0 0m2.6-1.9h-.6s-.1 0-.1.1v1.8s0 .1.1.1h.6s.1 0 .1-.1l.2-.6V72h-.2l-.1-1.2"/><path fill="#c52d35" d="M37.7 72.7h.4s.1 0 .1-.1l.2-.6v-.1h-.2c0 .1-.5.8-.5.8zm3.9-1.9h.7s.1 0 0 .1l-.7 1.8H41l.6-1.9"/><path fill="#c52d35" d="M40.8 70.8h-1c-.1 0 .3.1.3.1l.7 1.7s0 .1.1.1h.6l-.7-1.9m-1.3.6v.4s-.1-.4-.3-.4c-.3 0-.3.2-.3.3 0 .1.1.3.2.3h.5l-.3.7H39c-.2 0-.9-.3-.9-.9 0-.6.5-1 .9-1 .2-.1.5.2.5.6 0-.1 0-.1 0 0z"/><path fill="#5a1f57" d="M39.9 66.7h-1.6c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h1.6c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2"/><path fill="#c2b5cf" d="M38.7 66.5h.9V64h-.9v2.5z"/><path fill="#e7e5e2" d="M47.2 35.3C44.7 45.6 36.6 53.1 27 53.1S9.3 45.6 6.8 35.3c-.2.1-.5.1-.8.1-1.1 0-2-.8-2-1.7v-7c0-1 .9-1.7 2-1.7h.2C7.7 13.1 16.4 4 27 4c10.6 0 19.3 9.1 20.8 21h.2c1.1 0 2 .8 2 1.7v7c0 1-.9 1.7-2 1.7-.3 0-.5 0-.8-.1z"/><path fill="#635e59" d="M19 27.6c-1.4.1-1.9-2-1.4-3.4.1-.3.6-1.5 1.4-1.5.8 0 1.2.7 1.3.8.6 1.4.3 4-1.3 4.1m16.2 0c1.4.1 1.9-2 1.4-3.4-.1-.3-.6-1.5-1.4-1.5-.8 0-1.2.7-1.3.8-.6 1.4-.3 4 1.3 4.1"/><path fill="#d1bfa3" d="M26.8 34.6c-.4 0-.7-.1-1-.2-.3-.1-.4-.4-.3-.7.1-.3.4-.4.7-.3.5.2 1.5.1 2.2-.4.7-.4 1.1-1 1.2-1.5.1-.4-.1-.9-.4-1.3-.2-.2-.8-.2-1.6-.1-.3 0-.5-.1-.6-.4 0-.3.1-.5.4-.6 1.2-.2 2.1 0 2.6.6.5.7.8 1.4.6 2.1-.1.8-.7 1.6-1.7 2.2-.6.3-1.4.6-2.1.6z"/><path fill="#593a32" d="M27.1 42.1h-.3c-5.3-.2-7.3-4.1-7.4-4.3-.1-.3 0-.6.2-.7.2-.1.6 0 .7.2.1.1 1.9 3.6 6.6 3.8 4.7.2 6.4-3.7 6.4-3.7.1-.3.4-.4.7-.3.3.1.4.4.3.7-.1 0-2.1 4.3-7.2 4.3z"/><path fill="#f6b873" d="M6.6 30.7c.1-.1.1-.2.1-.3v-2c-.1-5.6 1.8-8.1 3.4-10.1 0 0-1 4.3-.3 3.4 3.8-5 21.4-1.6 25-8.1.5 3.6-4.1 4.6-4.1 4.6 3.7.7 6.9-.8 7.7-2.5.3 1.4-.6 2.4-1.9 3.4 4.5-.9 4.6-4 4.6-4 .6 4.1 5.3 2.5 5.3 9.3v6c0 .3.2.6.5.6h.5c.3 0 .5-.3.5-.6V26c.3-15.6-8.5-26-20.6-26C15.9 0 5 10.4 5 24.1v6.3c0 .4.2.6.5.6h.6c.2 0 .3-.1.5-.3"/><path fill="#f6b873" d="M25.9 43.4c-4.4 0-8-1.4-8-3.2s3.6-3.2 8-3.2 8 1.4 8 3.2c0 1.8-3.6 3.2-8 3.2m.8-9.4c-2.9 0-4.7.7-8.8 2.1-12.7 4.6-11.6-14-11.6-14C3.4 46 18.6 52 26.5 52c8.1 0 24.1-8.1 21-30 0 0 .4 17.1-12.9 13.8-3.7-.9-5-1.8-7.9-1.8z"/></svg>} // eslint disable-line
        >
          <Undertittel>Slik finner dere beløpet dere kan kreve:</Undertittel><br/>
          1. Beregn månedsinntekten slik det ellers gjøres for sykepenger i arbeidsgiverperioden.<br/>
          2. Gang med 12 måneder for å finne årslønn.<br/>
          3. Reduser beløpet til 6G (=599 148) hvis beløpet er over dette.<br/>
          4. Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.<br/>
          5. Trekk fra de tre første dagene, og krev refusjon fra og med dag 4, men maksimalt 13 dager til sammen.
          Dager før 16. mars får du ikke refusjon for.<br/>
          6. Gang dagsatsen med antall dager dere krever refusjon for.<br/><br/>
          <Undertittel>Eksempel:</Undertittel><br/>
          Frida har første fraværsdag 20. mars. Hun jobber mandag-fredag og får ikke utbetalt lønn for helgedager.
          Arbeidsgiverperioden går til og med 4. april<br/><br/>
          1. Trekk fra helgedager og de tre første dagene i arbeidsgiverperioden = 10 dager som det kan kreves
          refusjon for.<br/>
          2. Finn gjennomsnittet av Fridas bruttolønn i desember, januar og februar = kr. 55 000.<br/>
          3. Gang med 12 = 660 000 i årslønn.<br/>
          4. Reduser beløpet til 6G = 599 148.<br/>
          5. Del på 260 (antallet arbeidsdager Frida jobber i året) = 2 304 kroner pr dag (dagsats).<br/>
          6. Gang dagsatsen med 10 = 23 040 kroner.<br/>
          <button role="link" className="periodeknapp lenke" onClick={() => setEksempelOpen(false)}>
            Lukk dette vinduet
          </button>
        </Veilederpanel>
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
            <form onSubmit={methods.handleSubmit(setForm)} className="refusjonsform">
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
                  <button role="link" className="periodeknapp lenke" onClick={() => setEksempelOpen(true)}>
                    Se eksempel på utregning
                  </button>
                  <Perioder />

                </div>
              </div>

              <FeilOppsummering errors={methods.errors} />

              <div className="container">
                <Normaltekst>
                  Vi erklærer at det ikke er søkt om omsorgspenger og at arbeidstakeren ikke er permittert. Kravet er
                  basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av koronaviruset,
                  mistenkt smittet eller i lovpålagt karantene.
                  <br/><br/>
                  Vær oppmerksom på at NAV kan foreta kontroller.
                </Normaltekst>
              </div>

              <div className="container">
                <Knapp type="hoved"> Send søknad om refusjon </Knapp>
              </div>
            </form>
          </FormContext>
        </div>
      </Vis>
    </div>
  );
};

export default Sykepenger;
