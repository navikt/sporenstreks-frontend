import React, { useState } from 'react';
import './Ansatte.less';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattRad } from "./AnsattRad";
import { Validering } from "../validering/Validering";
import { ByggValideringsFeil } from "./ByggValideringsFeil";
import Innsending from "./Innsending";
import { LeggTilKnapp } from "./LeggTilKnapp";
import { BekreftKnapp } from "./BekreftKnapp";
import { Erklaring } from "./Erklaring";
import { ValideringOppsummering } from "./ValideringOppsummering";
import {History} from 'history';
import {useHistory} from "react-router-dom";
import {byggAnsatt, Ansatt} from "../../data/types/sporenstreksTypes";
import Advarsler from "./Advarsler";
import { Column, Row } from "nav-frontend-grid";
import Panel from "nav-frontend-paneler";
import Skillelinje from "./Skillelinje";

const Ansatte = () => {
  const {ansatte, setAnsatte, feil, setFeil, arbeidsgiverId, setLoadingStatus } = useAppStore();
  const history: History = useHistory();
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validerteAnsatte = Validering(ansatte);
    const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte, setLoadingStatus);
    setFeil(
      ByggValideringsFeil(innsendteAnsatte)
    );
    if(!innsendteAnsatte.find((ansatt: Ansatt) => !ansatt.referenceNumber)) {
      setAnsatte([byggAnsatt()])
      setFeil([])
      history.push('/kvitteringBulk')
    }
  };

  return (
    <div className="Ansatte">

      <Skillelinje/>

      <form onSubmit={handleSubmit}>
        {
          ansatte.map((ansatt) => <AnsattRad id={ansatt.id} key={ansatt.id} />)
        }

        <Row className={"ansatte__leggtilknapp"}>
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
              <BekreftKnapp onSubmit={handleSubmit} erklæringAkseptert={erklæringAkseptert} />
              <Advarsler erklæringAkseptert={erklæringAkseptert} harFeil={feil.length > 0}/>
            </Panel>
          </Column>
        </Row>
      </form>
    </div>
  );
};

export default Ansatte;
