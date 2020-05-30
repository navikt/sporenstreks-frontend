import React from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import Ansatte from '../components/ansatte/Ansatte';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/CoronaTopptekst';

const SykepengerBulk = () => {
  const methods = useForm();
  return (
    <InnloggetSide>
      <main>
        <CoronaTopptekst />
        <FormContext {...methods}>
          <Ansatte />
        </FormContext>
      </main>
    </InnloggetSide>
  );
};

export default SykepengerBulk;
