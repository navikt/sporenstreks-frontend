import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import './Sykepenger.less';
import { Erklaring } from '../components/ansatte/Erklaring';
import { Column, Row } from 'nav-frontend-grid';
import InnloggetSide from './InnloggetSide';
import { BekreftInnsending } from '../components/felles/BekreftInnsending';
import { Fodselsnummer } from '../components/enkel/Fodselsnummer';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { PerioderTabell } from '../components/enkel/PerioderTabell';
import Skillelinje from '../components/ansatte/Skillelinje';
import { PostRefusjonskrav } from '../api/RefusjonskravAPI';
import { useAppStore } from '../data/store/AppStore';
import { InnsendingSpinner } from '../components/felles/InnsendingSpinner';
import { ValideringOppsummering } from '../components/ansatte/ValideringOppsummering';

const Sykepenger = () => {
  const { arbeidsgiverId, identityNumberInput, perioder, setSpinner, feil, setFeil } = useAppStore();
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const [sendSkjemaOpen, setSendSkjemaOpen] = useState<boolean>(false);
  const onSubmit = async () => {
    setSendSkjemaOpen(false)
    setSpinner(true);
    const response = await PostRefusjonskrav(arbeidsgiverId, identityNumberInput, perioder);
    console.log('Skjema', response);
    //setFeil( response );
    setSpinner(false);
  }
  const onClose = () => {
    setSendSkjemaOpen(false)
  }
  const handleSubmit = (evt) => {
    setSendSkjemaOpen(true);
    evt.preventDefault()
  }
  return (
    <InnloggetSide>

      <InnsendingSpinner/>

      <BekreftInnsending visible={sendSkjemaOpen} submitHandler={onSubmit} closeHandler={onClose}/>

      <Row>
        <Column>
          <Panel>
            <Normaltekst>
              Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 4 i de 16 dagene arbeidsgiveren vanligvis
              skal betale. Den ansatte må være smittet, mistenkt smittet eller i pålagt karantene. Refusjon kan gis for
              dager fra og med 16. mars.
              <span> </span>
              <Lenke
                 href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
                Se mer informasjon om refusjonsordningen.
              </Lenke>
            </Normaltekst>
          </Panel>

          <Skillelinje />

          <Panel>
            <Undertittel>
              Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager
            </Undertittel>
          </Panel>
        </Column>
      </Row>

      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Panel>
              <Undertittel>Hvilken arbeidstaker gjelder søknaden?</Undertittel>
            </Panel>
            <Panel>
              <Fodselsnummer/>
            </Panel>
          </Column>
        </Row>

        <Skillelinje />

        <Row>
          <Column>
            <Panel>
              <Undertittel>Hvilken periode har den ansatte vært fraværende?</Undertittel>
              <Undertekst>
                NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar
              </Undertekst>
            </Panel>
          </Column>
        </Row>

        <Row>
          <Column>
            <Panel>
              <PerioderTabell />
            </Panel>
          </Column>
        </Row>

        <Row>
          <Column sm="12">
            <ValideringOppsummering />
          </Column>
        </Row>

        <Skillelinje />

        <Row>
          <Column>
            <Panel>
              <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)}/>
            </Panel>
          </Column>
        </Row>

        <Row>
          <Column>
            <Panel>
              <Knapp disabled={!erklæringAkseptert} type="hoved"> Send søknad om refusjon </Knapp>
            </Panel>
          </Column>
        </Row>
      </form>

    </InnloggetSide>
  );
};

export default Sykepenger;
