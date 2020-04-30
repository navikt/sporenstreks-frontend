import React from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import './SykepengerBulk.less';
import Ansatte from '../components/ansatte/Ansatte';
import InnloggetSide from "./InnloggetSide";
import {Column, Row} from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";

const SykepengerBulk = () => {
  const methods = useForm();
  return (
      <InnloggetSide>

        <Row>
          <Column>
            <Panel>
              <Normaltekst>
                I forbindelse med korona dekker NAV sykepenger fra dag 4 i perioden på 16 dager som arbeidsgiveren
                vanligvis betaler (arbeidsgiverperioden). Forutsetningen er at den ansatte er smittet av korona,
                mistenkt smittet eller i pålagt karantene. Her kan dere søke om refusjon for dager fra og med 16. mars.
              </Normaltekst>
              <Link to="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
                Du finner mer informasjon på denne siden.
              </Link>
            </Panel>
          </Column>
        </Row>

        <FormContext {...methods}>

          <Row>
            <Column>
              <Panel>
                  <Undertittel>
                    Oppgi ansatte, arbeidsgiverperiode og beløp
                  </Undertittel>
                  <Normaltekst>
                    Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
                    <Link to="../enkel/"> skal du bruke et eget skjema som du finner her.</Link>
                  </Normaltekst>
              </Panel>
            </Column>
          </Row>

          <Ansatte/>

        </FormContext>
      </InnloggetSide>
  );
};

export default SykepengerBulk;
