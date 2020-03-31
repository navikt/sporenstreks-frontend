import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { useAppStore } from '../data/store/AppStore';
import { Link } from 'react-router-dom';

const Kvittering = () => {
  const { referanseNummer } = useAppStore();

  return (
    <div className="limit">
      <Panel>
        <div>
          <Innholdstittel>Søknaden er mottatt.</Innholdstittel>
        </div>
        <div>
          <Ingress>Referansenummer: <b>{referanseNummer}</b></Ingress>
          Ta vare på referansenummeret da du vil trenge det dersom du kontakter oss om denne saken.
          Du vil også ha behov for fødselsnummeret til de ansatte det gjelder.
        </div>
        <AlertStripeInfo>
          Dersom dere ønsker å endre til mer hyppige utbetalinger enn det som er standard
          kan det gjøres via skjema for endring av utbetalingsintervaller på Altinn.
        </AlertStripeInfo>
        <div><a id="logout"
                href="https://loginservice.nav.no/slo" className="lenke informasjonsboks__lenke">Logg ut</a></div>
        <Link to="/" className="lenke informasjonsboks__lenke">
          Opprett en ny søknad
        </Link>
        <div><a href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/" className="lenke informasjonsboks__lenke">
          Tilbake til Min side - arbeidsgiver
        </a></div>
      </Panel>
    </div>
  );
};

export default Kvittering;
