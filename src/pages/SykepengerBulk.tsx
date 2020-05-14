import React from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import './SykepengerBulk.less';
import Ansatte from '../components/ansatte/Ansatte';
import InnloggetSide from './InnloggetSide';
import { CoronaTopptekst } from '../components/CoronaTopptekst';

const SykepengerBulk = () => {
  const methods = useForm();
  return (
      <InnloggetSide>
        <CoronaTopptekst/>
        <FormContext {...methods}>
          <Ansatte/>
        </FormContext>
      </InnloggetSide>
  );
};

export default SykepengerBulk;
