import React, { useState } from 'react';
import './Ansatte.less';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattRad } from './AnsattRad';
import { Validering } from '../validering/Validering';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import Innsending from './Innsending';
import { LeggTilKnapp } from './LeggTilKnapp';
import { BekreftKnapp } from './BekreftKnapp';
import { Erklaring } from './Erklaring';
import { ValideringOppsummering } from './ValideringOppsummering';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { byggAnsatt, Ansatt } from '../../data/types/sporenstreksTypes';
import Advarsler from './Advarsler';
import { Column, Row, Container } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Skillelinje from './Skillelinje';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LoggetUtAdvarsel from './LoggetUtAdvarsel';
import InternLenke from '../InternLenke';

const Ansatte: React.FC = () => {
  const { ansatte, setAnsatte, feil, setFeil, arbeidsgiverId, setLoadingStatus, setTokenExpired } = useAppStore();
  const history: History = useHistory();
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const [harTrykketSubmitMinstEnGang, setHarTrykketSubmitMinstEnGang] = useState<boolean>(false);
  const handleBekreftSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validerteAnsatte = Validering(ansatte);
    const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte, setLoadingStatus, setTokenExpired);
    setHarTrykketSubmitMinstEnGang(true);
    setFeil(
      ByggValideringsFeil(innsendteAnsatte)
    );
    if (!innsendteAnsatte.find((ansatt: Ansatt) => !ansatt.referenceNumber)) {
      setAnsatte([byggAnsatt()])
      setFeil([])
      history.push('/kvitteringBulk')
    }
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

        <Container>
          <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)} />
        </Container>

        <Row>
          <Column>
            <Panel>
              <BekreftKnapp onSubmit={handleBekreftSubmit} onClick={handleBekreftKlikk} erklæringAkseptert={erklæringAkseptert} />
              <Advarsler erklæringAkseptert={erklæringAkseptert} harFeil={feil.length > 0} visFeil={harTrykketSubmitMinstEnGang} />
            </Panel>
          </Column>
        </Row>
      </form>
      <LoggetUtAdvarsel />
    </div>
  );
};

export default Ansatte;
