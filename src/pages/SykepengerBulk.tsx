import React from 'react';
import 'nav-frontend-tabell-style';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import Ansatte from '../components/bulk/Ansatte';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/felles/CoronaTopptekst';
import TimeoutAdvarsel from '../components/login/TimeoutAdvarsel';

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
