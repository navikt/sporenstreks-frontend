import React from 'react';
import 'nav-frontend-tabell-style';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import Ansatte from '../components/bulk/Ansatte';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/felles/CoronaTopptekst';

const SykepengerBulk = () => {
  return (
      <InnloggetSide>
        <CoronaTopptekst />
          <Ansatte />
      </InnloggetSide>
  );
};

export default SykepengerBulk;
