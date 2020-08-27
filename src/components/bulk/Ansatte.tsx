import React, { useState } from 'react';
import './Ansatte.less';
import { AnsattRad } from './AnsattRad';
import { valideringAnsatte } from './ValideringAnsatte';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import Innsending from './Innsending';
import { LeggTilKnapp } from './LeggTilKnapp';
import { BekreftKnapp } from './BekreftKnapp';
import { Erklaring } from '../felles/Erklaring';
import { ValideringOppsummering } from './ValideringOppsummering';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { byggAnsatt, Ansatt } from './Ansatt';
import Advarsler from './Advarsler';
import { Column, Row, Container } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Skillelinje from '../felles/Skillelinje';
import { Normaltekst, Undertittel, Element } from 'nav-frontend-typografi';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import InternLenke from '../felles/InternLenke';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import HjelpetekstRefusjon from '../refusjon/HjelpetekstRefusjon';
import { useArbeidsgiver } from '../../context/ArbeidsgiverContext';
import { useBulk } from '../../context/BulkContext';
import { useAppStore } from '../../context/AppStoreContext';


const Ansatte: React.FC = () => {
  const { arbeidsgiverId } = useArbeidsgiver();
  const { ansatte, setAnsatte, feil, setFeil, setLoadingStatus } = useBulk();
  const { setTokenExpired } = useAppStore();
  const history: History = useHistory();
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const [harTrykketSubmitMinstEnGang, setHarTrykketSubmitMinstEnGang] = useState<boolean>(false);
  const handleBekreftSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validerteAnsatte = valideringAnsatte(ansatte);
    const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte, setLoadingStatus, setTokenExpired);
    setHarTrykketSubmitMinstEnGang(true);
    setFeil(
      ByggValideringsFeil(innsendteAnsatte)
    );
    if (!innsendteAnsatte.find((ansatt: Ansatt) => !ansatt.referenceNumber)) {
      setAnsatte([byggAnsatt()])
      setFeil([])

    }
    history.push('/bulk/kvittering')
  };
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
  }
  const handleBekreftKlikk = (evt: React.FormEvent) => {
    evt.preventDefault();
    setHarTrykketSubmitMinstEnGang(true);
  }

  return (
    <div className="ansatte">

      <Skillelinje />

      <form onSubmit={handleSubmit}>
        <Container>
          <Undertittel className="sykepenger--undertittel">
            Oppgi ansatte, arbeidsgiverperiode og beløp
              </Undertittel>
          <Normaltekst>
            Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
                <InternLenke to="/enkel/"> skal du bruke et eget skjema som du finner her.</InternLenke>
          </Normaltekst>
          <Normaltekst>
            Har dere svært mange ansatte kan det om ønskelig <InternLenke to="/excel/">benyttes Excel-opplasting.</InternLenke>
          </Normaltekst>
        </Container>
        <div>

        <Row className="AnsattRad-overskrift">
          <Column md="1" xs="12">
            <Element tag="span" className="AnsattRad-overskrift--element">
              Nr.
            </Element>
          </Column>
          <Column md="2" xs="12">
            <Element tag="span" className="AnsattRad-overskrift--element">
              Fødselsnummer:
            </Element>
          </Column>
          <Column md="4" xs="12">
            <Element tag="span" className="AnsattRad-overskrift--element">
              Hvilken periode var den ansatte borte?
              <HjelpetekstPeriode />
            </Element>
          </Column>
          <Column md="2" xs="12">
            <Element tag="span" className="AnsattRad-overskrift--element">
              Antall dager:<HjelpetekstDager />
            </Element>
          </Column>
          <Column md="2" xs="12">
            <Element tag="span" className="AnsattRad-overskrift--element">
              Beløp:<HjelpetekstRefusjon />
            </Element>
          </Column>
          <Column md="1" xs="12">
          </Column>
        </Row>
        </div>

        {
          ansatte.map((ansatt) => <AnsattRad id={ansatt.id} key={ansatt.id} />)
        }

        <Row className={'ansatte__leggtilknapp'}>
          <Column md="1" sm="12"> </Column>
          <Column sm="10"><LeggTilKnapp /></Column>
        </Row>

        <Skillelinje />

        <Row>
          <Column sm="12">
            <ValideringOppsummering />
          </Column>
        </Row>

        <Row>
          <Column>
            <Panel>
              <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)} />
            </Panel>
          </Column>
        </Row>
      </form>

      <Row className="send-soknad">
        <Column>
          <Panel>
            <BekreftKnapp onSubmit={handleBekreftSubmit} onClick={handleBekreftKlikk} erklæringAkseptert={erklæringAkseptert} />
            <Advarsler erklæringAkseptert={erklæringAkseptert} harFeil={feil.length > 0} visFeil={harTrykketSubmitMinstEnGang} />
          </Panel>
        </Column>
      </Row>
      <LoggetUtAdvarsel />
    </div>
  );
};

export default Ansatte;
