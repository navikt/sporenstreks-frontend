import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import { Knapp } from 'nav-frontend-knapper';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import { Periode, RefusjonsKrav, Ansatt } from '../data/types/sporenstreksTypes';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import FeilOppsummering from '../components/feilvisning/FeilOppsummering';
import { useAppStore } from '../data/store/AppStore';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { History } from 'history';
import dayjs from 'dayjs';
import Vis from '../components/Vis';
import env from '../util/environment';
import Ansatte from '../components/ansatte/Ansatte';
import './SykepengerBulk.less';
import Ansatte2 from '../components/ansatte/Ansatte2';
import Beloep from '../components/inputfelt/Beloep';

interface sykepengerData {
  "identitetsnummer": Number | undefined;
  "virksomhetsnummer": String | undefined;
  "perioder":[
    {
      "fom": String | undefined;
      "tom": String | undefined;
      "antallDagerMedRefusjon": number | undefined;
      "beloep": number | undefined;
    }
  ]
}

const SykepengerBulk = () => {
  const { ansatte, arbeidsgivere, setReferanseNummer, identityNumberInput } = useAppStore();
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const methods = useForm();
  const { t } = useTranslation();
  const history: History = useHistory();

  const formToJSON = elms =>
    [].reduce.call(elms, (data: any, elm: any) => {
      data[elm.name] = elm.value;
      return data;
    }, {});

  const onSubmit = async(e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const preparedAnsatte: sykepengerData[] = ansatte.map((ansatt: Ansatt) => {
      return {
        identitetsnummer: ansatt.fnr,
        virksomhetsnummer: arbeidsgiverId,
        perioder: [
          {
            fom: ansatt.fom,
            tom: ansatt.tom,
            antallDagerMedRefusjon: ansatt.antallDagerMedRefusjon,
            beloep: ansatt.beloep
          }
        ]
      }
    })

    console.log("ansatte", JSON.stringify(ansatte));

    await fetch(env.baseUrl + '/api/v1/refusjonskrav/list', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(preparedAnsatte),
    }).then(response => {
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
            return methods;
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

  return (
    <div className="sykepenger-bulk">
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

            <form onSubmit={(e) => onSubmit(e)} className="refusjonsform">
              <div className="container">
                <div className="sykepenger--periode-velger form-group">
                  <Undertittel className="sykepenger--undertittel">
                    Hvilken periode har den ansatte vært fraværende?
                  </Undertittel>
                  <Undertekst className="sykepenger--undertekst">
                    NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar
                  </Undertekst>

                  <Ansatte2 />

                </div>
              </div>

              <div className="container">
                <Normaltekst>
                  Vi erklærer at det ikke er søkt om omsorgspenger og at arbeidstakeren ikke er permittert. Kravet er
                  basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av koronaviruset,
                  mistenkt smittet eller i lovpålagt karantene.
                  <br /><br />
                  Vær oppmerksom på at NAV kan foreta kontroller.
                </Normaltekst>
              </div>
            </form>
          </FormContext>
        </div>
      </Vis>
    </div>
  );
};

export default SykepengerBulk;
