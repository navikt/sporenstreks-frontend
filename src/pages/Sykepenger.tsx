import React, { useRef } from 'react';
import 'nav-frontend-tabell-style';
import { FnrInput, Feiloppsummering } from 'nav-frontend-skjema';
import { FormProvider, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import {
  Feilmelding,
  Normaltekst,
  Systemtittel,
  Undertittel
} from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import fnrvalidator from '@navikt/fnrvalidator';
import { History } from 'history';
import ModalWrapper from 'nav-frontend-modal';
import { Column, Container, Row } from 'nav-frontend-grid';
import { useArbeidsgiver } from '../context/ArbeidsgiverContext';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/felles/CoronaTopptekst';
import Skillelinje from '../components/felles/Skillelinje';
import Panel from 'nav-frontend-paneler';
import Perioder from '../components/enkel/Perioder';
import formToJSON from '../components/enkel/formToJSON';
import convertSkjemaToRefusjonsKrav from '../components/enkel/convertSkjemaToRefusjonsKrav';
import env from '../components/felles/environment';
import InternLenke from '../components/felles/InternLenke';
import { Erklaring } from '../components/felles/Erklaring';
import Vis from '../components/felles/Vis';
import { fnrErrorState, useEnkelSkjema } from '../context/EnkelContext';
import { useAppStore } from '../context/AppStoreContext';
import { Linker } from './Linker';
import { filterIdentityNumberInput } from '../components/fnr/filterIndentityNumberInput';

const Sykepenger = () => {
  const { arbeidsgiverId, firma } = useArbeidsgiver();
  const { setTokenExpired } = useAppStore();
  const {
    setReferanseNummer,
    identityNumberInput,
    setIdentityNumberInput,
    erklæringAkseptert,
    setErklæringAkseptert,
    sendSkjemaOpen,
    setSendSkjemaOpen,
    formData,
    setFormData,
    fnrClassName,
    setFnrClassName
  } = useEnkelSkjema();

  const methods = useForm();
  const history: History = useHistory();
  const refRefusjonsform = useRef(null);

  const handleFnrChange = (fnr: string) => {
    setIdentityNumberInput(filterIdentityNumberInput(fnr));
    validateFnr(fnr);
  };

  const setForm = (e: any) => {
    const form = refRefusjonsform.current ?? e.target;
    const formAsJson = Object(formToJSON(form.elements));

    const harFeil = validateValuesAreSet(formAsJson, validateFnr, methods);

    setFormData(formAsJson);
    if (!harFeil) {
      setSendSkjemaOpen(true);
    }
  };

  const submitForm = async (): Promise<void> => {
    const refusjonsKrav = convertSkjemaToRefusjonsKrav(
      formData,
      identityNumberInput,
      arbeidsgiverId
    );
    setSendSkjemaOpen(false);

    const FETCH_TIMEOUT = 5000;
    let didTimeOut = false;

    new Promise((resolve, reject) => {
      const timeout = setTimeout(function () {
        didTimeOut = true;
        reject(new Error('Request timed out'));
      }, FETCH_TIMEOUT);

      fetch(env.baseUrl + '/api/v1/refusjonskrav', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(refusjonsKrav)
      })
        .then((response: Response) => {
          clearTimeout(timeout);
          if (!didTimeOut) {
            if (response.status === 401) {
              setTokenExpired(true);
              window.location.href = env.loginServiceUrl;
            } else if (response.status === 200) {
              response.json().then((data) => {
                setReferanseNummer(data.referansenummer);
                history.push(Linker.EnkelKvittering);
              });
            } else if (response.status === 422) {
              response.json().then((data) => {
                data.violations.forEach((violation) => {
                  methods.setError('backend', {
                    type: violation.message,
                    message: violation.message
                  });
                });
                data.violations.map((violation) => ({
                  errorType: violation.validationType,
                  errorMessage: violation.message
                }));
              });
            } else {
              // todo: error 400
              methods.setError('backend', {
                type: 'Server feil, prøv igjen senere',
                message: 'Server feil, prøv igjen senere'
              });
            }
          }
        })
        .catch((err) => {
          if (didTimeOut) return;
          reject(err);
        });
    }).catch(() => {
      methods.setError('backend', {
        type: 'Server feil, prøv igjen senere',
        message: 'Server feil, prøv igjen senere'
      });
    });
  };

  const validateFnr = (value: string) => {
    value = value.replace(/-/g, '');
    const notValid = fnrvalidator.fnr(value).status === 'invalid';
    let msg = '';
    if (value === '') {
      msg = 'Fødselsnummer må fylles ut';
    } else if (value.length < 11) {
      msg = 'Fødselsnummer må ha 11 siffer';
    } else if (notValid) {
      msg = 'Fødselsnummer er ugyldig';
    }

    if (msg !== '') {
      setFnrClassName(fnrErrorState.hasError);
      methods.setError('fnr', { type: msg, message: msg });
      return false;
    } else {
      setFnrClassName(fnrErrorState.noError);
      methods.clearErrors(['fnr', 'backend']);
      return true;
    }
  };

  const errors = methods.formState.errors ?? {};
  const feilmeldingKeys = errors ? Object.keys(errors) : [];
  const feilmeldinger = feilmeldingKeys
    ? feilmeldingKeys.map((feil) => {
        return {
          skjemaelementId: feil,
          feilmelding: methods.formState.errors[feil].message
        };
      })
    : [];

  const feilmeldingerTittel =
    'Det er ' + feilmeldinger.length + ' feil i skjemaet';

  return (
    <>
      <ModalWrapper
        isOpen={sendSkjemaOpen}
        onRequestClose={() => setSendSkjemaOpen(false)}
        closeButton={false}
        contentLabel='Send skjema'
      >
        <Undertittel className='sykepenger__modal-tittel'>
          Du søker om refusjon på vegne av:
        </Undertittel>
        <p className='sykepenger__modal-tekst'>{firma}</p>
        <p className='sykepenger__modal-tekst'>
          Organisasjonsnummer: {arbeidsgiverId}
        </p>
        <Knapp className='sykepenger__modal-btn' onClick={() => submitForm()}>
          Send søknad om refusjon
        </Knapp>
        <InternLenke
          className='sykepenger__modal-avbrytt'
          onClick={() => setSendSkjemaOpen(false)}
        >
          Avbryt
        </InternLenke>
      </ModalWrapper>
      <InnloggetSide>
        <CoronaTopptekst />
        <Skillelinje />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(setForm)} ref={refRefusjonsform}>
            <Row>
              <Column>
                <Panel>
                  <Systemtittel className='sykepenger--undertittel'>
                    Hvilken arbeidstaker gjelder søknaden?
                  </Systemtittel>

                  <Normaltekst>
                    Vi har også et eget{' '}
                    <InternLenke to={Linker.Bulk}>
                      {' '}
                      skjema for å sende inn flere ansatte samtidig{' '}
                    </InternLenke>
                    (kun enkeltperioder per ansatt).
                  </Normaltekst>
                  <Normaltekst>
                    Hvis dere har mange ansatte kan dere{' '}
                    <InternLenke to={Linker.Excel}>
                      benytte Excel-opplasting.
                    </InternLenke>{' '}
                    Hvis dere vil endre tidligere innsendte krav pga. f.eks.
                    tariffendring må dere{' '}
                    <InternLenke to={Linker.Excel}>
                      benytte Excel-opplasting.
                    </InternLenke>{' '}
                  </Normaltekst>
                </Panel>
              </Column>
            </Row>
            <Row>
              <Column>
                <Panel>
                  <FnrInput
                    id='fnr'
                    name='fnr'
                    label='Fødselsnummer til arbeidstaker'
                    bredde='M'
                    value={identityNumberInput}
                    placeholder='11 siffer'
                    onChange={(e) => handleFnrChange(e.target.value)}
                    onValidate={() => undefined}
                    className='skjemaelement__fnr-input-posisjon'
                  />

                  <Normaltekst
                    tag='div'
                    role='alert'
                    aria-live='assertive'
                    className={'skjemaelement__feilmelding fnr ' + fnrClassName}
                  >
                    <Vis hvis={!!methods.formState.errors['fnr']}>
                      <Feilmelding>
                        {methods.formState.errors['fnr'] &&
                          methods.formState.errors['fnr'].type}
                      </Feilmelding>
                    </Vis>
                  </Normaltekst>
                </Panel>
              </Column>
            </Row>
            <Skillelinje />
            <Container className='sykepenger--container'>
              <div className='sykepenger--periode-velger form-group'>
                <Undertittel className='sykepenger--undertittel'>
                  Hvor mange arbeidsdager gikk tapt?
                </Undertittel>
                <Perioder />
              </div>
            </Container>
            {feilmeldinger.length > 0 && (
              <Feiloppsummering
                feil={feilmeldinger}
                tittel={feilmeldingerTittel}
              />
            )}
            <Skillelinje />
            <Row>
              <Column>
                <Panel>
                  <Erklaring
                    value={erklæringAkseptert}
                    handleSetErklæring={(value) => setErklæringAkseptert(value)}
                  />
                </Panel>
              </Column>
            </Row>

            <Row>
              <Column className='send-soknad'>
                <Panel>
                  <Knapp disabled={!erklæringAkseptert} type='hoved'>
                    {' '}
                    Send søknad om refusjon{' '}
                  </Knapp>
                </Panel>
              </Column>
            </Row>
          </form>
        </FormProvider>
      </InnloggetSide>
    </>
  );
};

export default Sykepenger;

function validateValuesAreSet(
  formAsJson: any,
  validateFnr: (value: string) => boolean,
  methods
) {
  let harFeil = false;

  Object.keys(formAsJson).forEach((element) => {
    const [fieldName] = element.split('_');
    switch (fieldName) {
      case 'fnr':
        harFeil = harFeil || !validateFnr(formAsJson.fnr);
        break;
      case 'periode':
        if (!formAsJson[element]) {
          methods.setError(element, {
            type: 'Dato må fylles ut',
            message: 'Dato må fylles ut'
          });
          harFeil = true;
        }
        break;
      case 'dager':
        if (!formAsJson[element] || formAsJson[element] === '0') {
          methods.setError(element, {
            type: 'Antall dager må fylles ut',
            message: 'Antall dager må fylles ut'
          });
          harFeil = true;
        }
        break;
      case 'refusjon':
        if (!formAsJson[element]) {
          methods.setError(element, {
            type: 'Beløp må fylles ut',
            message: 'Beløp må fylles ut'
          });
          harFeil = true;
        }
        if (formAsJson[element] < 0) {
          methods.setError(element, {
            type: 'Beløp må være større enn 0',
            message: 'Beløp må være større enn 0'
          });
          harFeil = true;
        }
        break;
      default:
        break;
    }
  });
  return harFeil;
}
