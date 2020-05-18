import React, {useState} from 'react';
import './Ansatte.less';
import {useAppStore} from '../../data/store/AppStore';
import {AnsattRad} from './AnsattRad';
import {Validering} from '../validering/Validering';
import {ByggValideringsFeil} from './ByggValideringsFeil';
import Innsending from './Innsending';
import {LeggTilKnapp} from './LeggTilKnapp';
import {BekreftKnapp} from './BekreftKnapp';
import {Erklaring} from './Erklaring';
import {ValideringOppsummering} from './ValideringOppsummering';
import {History} from 'history';
import {useHistory} from 'react-router-dom';
import {Ansatt, byggAnsatt} from '../../data/types/sporenstreksTypes';
import Advarsler from './Advarsler';
import {Column, Row} from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Skillelinje from './Skillelinje';
import {Normaltekst, Undertittel} from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import LoggetUtAdvarsel from './LoggetUtAdvarsel';

const Ansatte = () => {
  const { ansatte, setAnsatte, feil, setFeil, arbeidsgiverId, loadingStatus, setLoadingStatus, setTokenExpired } = useAppStore();
  const history: History = useHistory();
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const [ harTrykketSubmitMinstEnGang, setHarTrykketSubmitMinstEnGang ] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validerteAnsatte = Validering(ansatte);
    const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte, setLoadingStatus, setTokenExpired);
    setHarTrykketSubmitMinstEnGang(true);
    setFeil(
      ByggValideringsFeil(innsendteAnsatte)
    );
    if(!innsendteAnsatte.find((ansatt: Ansatt) => !ansatt.referenceNumber)) {
      setAnsatte([byggAnsatt()])
      setFeil([])
      history.push('/kvitteringBulk')
    }
  };

  const handleBekreftKlikk = (e: React.FormEvent) => {
    setHarTrykketSubmitMinstEnGang(true);
  }

  return (
    <div className="ansatte">

      <Skillelinje/>

      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Panel>
              <Undertittel>
                Oppgi ansatte, arbeidsgiverperiode og beløp
              </Undertittel>
              <Normaltekst>
                Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
                <Lenke href="../enkel/"> skal du bruke et eget skjema som du finner her.</Lenke>
              </Normaltekst>
              <Normaltekst>
                Har dere svært mange ansatte kan det om ønskelig <Lenke href="../excel/">benyttes Excel-opplasting.</Lenke>
              </Normaltekst>
            </Panel>
          </Column>
        </Row>

        {
          ansatte.map((ansatt) => <AnsattRad id={ansatt.id} key={ansatt.id} />)
        }

        <Row className={'ansatte__leggtilknapp'}>
          <Column md="1" sm="12"> </Column>
          <Column sm="10"><LeggTilKnapp /></Column>
        </Row>

        <Skillelinje/>

        <Row>
          <Column sm="12">
            <ValideringOppsummering />
          </Column>
        </Row>

        <Row>
          <Column sm="12">
            <Panel>
              <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)}/>
            </Panel>
          </Column>
        </Row>

        <Row>
          <Column>
            <Panel>
              <BekreftKnapp onSubmit={handleSubmit} onClick={handleBekreftKlikk} erklæringAkseptert={erklæringAkseptert} />
              <Advarsler erklæringAkseptert={erklæringAkseptert} harFeil={feil.length > 0} visFeil={harTrykketSubmitMinstEnGang}/>
            </Panel>
          </Column>
        </Row>
      </form>
      <LoggetUtAdvarsel/>
    </div>
  );
};

export default Ansatte;
