import React, { useRef, useState } from 'react';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { FormContext, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import fnrvalidator from '@navikt/fnrvalidator';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import Perioder from '../components/perioder/Perioder';
import { filterStringToNumbersOnly } from '../util/filterStringToNumbersOnly';
import { identityNumberSeparation } from '../util/identityNumberSeparation';
import FeilOppsummering from '../components/feilvisning/FeilOppsummering';
import { useAppStore } from '../data/store/AppStore';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { History } from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import Lenke from 'nav-frontend-lenker';
import ModalWrapper from 'nav-frontend-modal';
import Eksempel from '../components/Eksempel';
import formToJSON from '../util/formToJSON';
import convertSkjemaToRefusjonsKrav from '../util/convertSkjemaToRefusjonsKrav';
import { Erklaring } from '../components/ansatte/Erklaring';
import { Container } from 'nav-frontend-grid';
import InternLenke from '../components/InternLenke';
import Panel from 'nav-frontend-paneler';

const fnrErrorState = {
  hasError: '',
  noError: 'tom'
}

const Sykepenger = () => {
  const { arbeidsgivere, setReferanseNummer, setTokenExpired } = useAppStore();
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const { arbeidsgiverId, setArbeidsgiverId } = useAppStore();
  const { firma, setFirma } = useAppStore();
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
            setTokenExpired(true)
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
    <main className="sykepenger">
      <Vis hvis={arbeidsgivere.length === 0}>
        <div>
          <AlertStripeAdvarsel>
            <div>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</div>
            <div>Tildeling av roller foregår i Altinn</div>
            <Lenke href="/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
              className="informasjonsboks__lenke"
            >
              Les mer om roller og tilganger.
            </Lenke>
          </AlertStripeAdvarsel>
        </div>
      </Vis>

      <ModalWrapper
        isOpen={sendSkjemaOpen}
        onRequestClose={() => setSendSkjemaOpen(false)}
        closeButton={false}
        contentLabel="Send skjema"
      >
        <Undertittel className="sykepenger__modal-tittel">Du søker om refusjon på vegne av:</Undertittel>
        <p className="sykepenger__modal-tekst">{firma}</p>
        <p className="sykepenger__modal-tekst">Organisasjonsnummer: {arbeidsgiverId}</p>
        <Knapp className="sykepenger__modal-btn" onClick={() => submitForm()}>Send søknad om refusjon</Knapp>
        <InternLenke className="sykepenger__modal-avbrytt" onClick={() => setSendSkjemaOpen(false)}>
          Avbryt
        </InternLenke>
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

        <div className="limit"  style={{ padding: '2rem 0rem 1rem 0rem' }}>
          <Lenke href="/min-side-arbeidsgiver/" style={{ paddingLeft: '1rem' }}>&lt;&lt; Min side arbeidsgiver</Lenke>
        </div>

        <div className="skjemabakgrunn">
          <Container>
            <Normaltekst>
            Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 4 i de 16 dagene arbeidsgiveren vanligvis skal betale.
            Den ansatte må være smittet, mistenkt smittet eller i pålagt karantene. Refusjon kan gis for dager fra og med 16. mars.
            <span> </span>
            <Lenke className="informasjonsboks__lenke"
               href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
              Se mer informasjon om refusjonsordningen.
            </Lenke>
          </Normaltekst>
          <Undertittel className="sykepenger--header">
            Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager
          </Undertittel>
          </Container>

          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(setForm)} ref={refRefusjonsform}>
              <Container>
                <div className="sykepenger--arbeidstaker">
                  <Undertittel className="sykepenger--undertittel">
                    Hvilken arbeidstaker gjelder søknaden?
                  </Undertittel>

                  <Normaltekst>
                    Vi har også et eget <InternLenke to="/bulk/"> skjema for å sende inn flere ansatte samtidig </InternLenke>
                    (kun enkeltperioder per ansatt), og for dere som har mer enn 50 ansatte å rapportere inn har vi
                    mulighet for <InternLenke to="/excel/"> excel-opplasting av kravet.</InternLenke>
                  </Normaltekst>

                  <div>&nbsp;</div>

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
              </Container>

              <Container>
                <div className="sykepenger--periode-velger form-group">
                  <Undertittel className="sykepenger--undertittel">
                    Hvor mange arbeidsdager gikk tapt?
                  </Undertittel>
                  <Perioder/>

                </div>
              </Container>

              <FeilOppsummering errors={methods.errors} />

              <Container>
                <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)}/>
              </Container>

              <Container>
                <Panel>
                  <Knapp disabled={!erklæringAkseptert} type="hoved"> Send søknad om refusjon </Knapp>
                </Panel>
              </Container>
            </form>
          </FormContext>
        </div>
      </Vis>
    </main>
  );
};

export default Sykepenger;
