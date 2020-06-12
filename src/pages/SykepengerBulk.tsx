import React from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import Ansatte from '../components/ansatte/Ansatte';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/CoronaTopptekst';
import TimeoutAdvarsel from '../components/ansatte/TimeoutAdvarsel';

const SykepengerBulk = () => {
  const methods = useForm();
  return (
    <main>
      <InnloggetSide>
        <TimeoutAdvarsel/>
        <CoronaTopptekst />
        {/* <FormContext {...methods}> */}
          <Ansatte />
        {/* </FormContext> */}
      </InnloggetSide>
    </main>
  );
};

export default SykepengerBulk;
