import React from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import './SykepengerBulk.scss';
import Ansatte from '../components/ansatte/Ansatte';
import InnloggetSide from "./InnloggetSide";
import {Column, Row} from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import {CoronaTopptekst} from "../components/CoronaTopptekst";

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
