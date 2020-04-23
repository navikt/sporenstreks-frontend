import React from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { useAppStore } from '../data/store/AppStore';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { History } from 'history';
import Vis from '../components/Vis';
import './SykepengerBulk.less';
import Ansatte from '../components/ansatte/Ansatte';


const SykepengerBulk = () => {
  const { arbeidsgivere, setArbeidsgiverId } = useAppStore();
  const { setFirma } = useAppStore();
  const methods = useForm();
  const { t } = useTranslation();
  const history: History = useHistory();
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
          onOrganisasjonChange={(org: Organisasjon) => {
            setArbeidsgiverId(org.OrganizationNumber);
            setFirma(org.Name);
          }}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="limit skjemabakgrunn">
          <div className="container">
            <Normaltekst>
              I forbindelse med korona dekker NAV sykepenger fra dag 4 i perioden på 16 dager som arbeidsgiveren
              vanligvis betaler (arbeidsgiverperioden). Forutsetningen er at den ansatte er smittet av korona,
              mistenkt smittet eller i pålagt karantene. Her kan dere søke om refusjon for dager fra og med 16. mars.
              <span> </span>
              <a className="lenke informasjonsboks__lenke" href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
                Du finner mer informasjon på denne siden.
              </a>
            </Normaltekst>
          </div>
          <FormContext {...methods}>
              <div className="container">
                <div className="sykepenger--periode-velger form-group">
                  <Undertittel className="sykepenger--undertittel">
                    Hvilken periode har den ansatte vært fraværende?
                  </Undertittel>
                  <Undertekst className="sykepenger--undertekst">
                    NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar
                  </Undertekst>
                  <Ansatte/>
                </div>
              </div>
          </FormContext>
        </div>
      </Vis>
    </div>
  );
};

export default SykepengerBulk;
