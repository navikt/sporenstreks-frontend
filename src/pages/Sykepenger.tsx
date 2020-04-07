import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import { Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import Perioder from '../components/perioder/Perioder';
import FeilOppsummering from '../components/feilvisning/FeilOppsummering';
import { useAppStore } from '../data/store/AppStore';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { History } from 'history';
import dayjs from 'dayjs';
import Vis from '../components/Vis';
import env from '../util/environment';
import './Sykepenger.less';
import FodselNr from '../components/inputfelt/FodselNr';
import Lenke from "nav-frontend-lenker";

const Sykepenger = () => {
  const { arbeidsgivere, setReferanseNummer, identityNumberInput } = useAppStore();
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const methods = useForm();
  const { t } = useTranslation();
  const history: History = useHistory();

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
        tom: days[1],
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

  const onSubmit = async(e: any): Promise<void> => {
    const form: HTMLFormElement = document.querySelector('.refusjonsform') ?? e.target;
    const data = formToJSON(form.elements);
    const refusjonsKrav = convertSkjemaToRefusjonsKrav(data);

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
            methods.setError('backend', 'Feil ved innsending av skjema');
          }
        }
      }).catch(err => {
        if(didTimeOut) return;
        reject(err);
      });
    }).catch(err => {
      methods.setError('backend', 'Feil ved innsending av skjema');
    });
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

      <Vis hvis={arbeidsgivere.length > 0}>
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="limit">
          <AlertStripeAdvarsel>
            En ny versjon av dette skjemaet er under utvikling. Der blir det mulig å søke om refusjon for flere ansatte
            samtidig.
            <br/>
            <Lenke href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
              Vi ber offentlig sektor vente med å søke.
            </Lenke>
          </AlertStripeAdvarsel>
          <div className="container">
            <Normaltekst>
              Vanligvis skal arbeidsgiveren betale sykepenger de første 16 kalenderdagene (arbeidsgiverperioden) av et
              sykefravær. I forbindelse med korona-pandemien kan refusjon det gis fra og med fjerde dag i
              arbeidsgiverperioden. Dette gjelder hvis den ansatte enten er smittet, mistenkt smittet eller i pålagt
              karantene. Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager.
              <br /><br />
              Vent med å søke til arbeidsgiverperioden på 16 dager er over.
              <br /><br />
              Bruk dette skjemaet for å søke om refusjon for de siste 13 dagene av arbeidsgiverperioden.
            </Normaltekst>
          </div>
          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="refusjonsform">
              <div className="container">
                <FodselNr />
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
                <Normaltekst>
                  Vi erklærer at det ikke er søkt om omsorgspenger og at arbeidstakeren ikke er permittert. Kravet er
                  basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av koronaviruset,
                  mistenkt smittet eller i lovpålagt karantene.
                  <br /><br />
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
