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

        <div className="limit"  style={{padding: "2rem 0rem 1rem 0rem"}}>
          <a href="/min-side-arbeidsgiver/" className="lenke informasjonsboks__lenke" style={{paddingLeft: "1rem"}}>&lt;&lt;Min side arbeidsgiver</a>
        </div>

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
                    Oppgi ansatte, arbeidsgiverperiode og beløp
                  </Undertittel>
                  <Normaltekst>
                    Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
                    <Link to="../"> skal du bruke et eget skjema som du finner her.</Link>
                  </Normaltekst>
                  {/*<Normaltekst>*/}
                  {/*  Har dere svært mange ansatte kan det om ønskelig*/}
                  {/*  <Link to="../excel/"> benyttes Excel-opplasting.</Link>*/}
                  {/*</Normaltekst>*/}
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
