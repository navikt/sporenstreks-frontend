import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Ingress } from 'nav-frontend-typografi';
import { useAppStore } from '../data/store/AppStore';
import { Link } from 'react-router-dom';

const Kvittering = () => {
  const { referanseNummer } = useAppStore();

  return (
    <div className="limit">
      <AlertStripeInfo>
        <div>
          <Ingress>Søknaden er mottatt.</Ingress>
          Dersom den blir godkjent vil beløpet utbetales innen X virkedager. Beløpet kan ikke overstige 6G.
        </div>
        <div>
          <Ingress>Referansenummer: <span style={{fontWeight: "bold"}}>{referanseNummer}</span></Ingress>
          Ta vare på referansenummeret da du vil trenge det dersom du kontakter oss om denne saken.
        </div>
        <Link to="/" className="lenke informasjonsboks__lenke">
          Opprett en ny søknad
        </Link>
        <div><Link to="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/" className="lenke informasjonsboks__lenke">
          Tilbake til Min side - arbeidsgiver
        </Link></div>
      </AlertStripeInfo>
    </div>
  );
};

export default Kvittering;
