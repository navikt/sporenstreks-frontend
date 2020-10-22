import React from 'react';
import 'nav-frontend-tabell-style';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import Ansatte from '../components/bulk/Ansatte';
import { CoronaTopptekst } from '../components/felles/CoronaTopptekst';
import { InnloggetSide } from '@navikt/helse-arbeidsgiver-felles-frontend';

const SykepengerBulk = () => {
  return (
      <InnloggetSide>
        <CoronaTopptekst />
          <Ansatte />
      </InnloggetSide>
  );
};

export default SykepengerBulk;
