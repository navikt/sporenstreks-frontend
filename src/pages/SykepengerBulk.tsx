import React from 'react';
import 'nav-frontend-tabell-style';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import Ansatte from '../components/ansatte/Ansatte';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/CoronaTopptekst';
import TimeoutAdvarsel from '../components/ansatte/TimeoutAdvarsel';

const SykepengerBulk = () => {
  return (
    <main>
      <InnloggetSide>
        <TimeoutAdvarsel/>
        <CoronaTopptekst />
          <Ansatte />
      </InnloggetSide>
    </main>
  );
};

export default SykepengerBulk;
