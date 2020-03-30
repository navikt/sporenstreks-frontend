import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useAppStore } from '../data/store/AppStore';
import { Link } from 'react-router-dom';

const Kvittering = () => {
  const { referanseNummer } = useAppStore();

  return (
    <div className="limit">
      <AlertStripeInfo>
        <div>Søknaden er mottat</div>
        <div>Referansnummer: {referanseNummer}</div>
        <Link to="/nettrefusjon" className="lenke informasjonsboks__lenke">
          Ny søknad
        </Link>
      </AlertStripeInfo>
    </div>
  );
};

export default Kvittering;
