import React, { useState } from 'react';
import './Ansatte.less';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattRad } from "./AnsattRad";
import { Validering } from "../validering/Validering";
import { ByggValideringsFeil } from "./ByggValideringsFeil";
import Innsending from "./Innsending";
import { LeggTilKnapp } from "./LeggTilKnapp";
import { BekreftKnapp } from "./BekreftKnapp";
import { HjelpetekstRefusjon } from "./HjelpetekstRefusjon";
import { HjelpetekstDager } from "./HjelpetekstDager";
import { HjelpetekstPeriode } from "./HjelpetekstPeriode";
import { Erklaring } from "./Erklaring";
import { ValideringOppsummering } from "./ValideringOppsummering";
import {History} from 'history';
import {useHistory} from "react-router-dom";
import {byggAnsatt} from "../../data/types/sporenstreksTypes";

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
    if (feil.length === 0) {
      setAnsatte([byggAnsatt()])
      setFeil([])
      history.push('/kvitteringBulk')
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="refusjonsform">
        <table className="AnsattTable">
          <tbody>
          <tr>
            <th>Rad</th>
            <th>
              <span>Fødselsnummer</span>
            </th>
            <th>
              <span>Periode</span>
              {HjelpetekstPeriode()}
            </th>
            <th>
              <span>Antall dager</span>
              {HjelpetekstDager()}
            </th>
            <th>
              <span>Beløp</span>
              {HjelpetekstRefusjon()}
            </th>
            <th></th>
          </tr>
          {
            ansatte.map((ansatt) => <AnsattRad id={ansatt.id} key={ansatt.id} />)
          }
          </tbody>
        </table>
        <LeggTilKnapp />

        <ValideringOppsummering />

        <div className="container">
          {Erklaring(erklæringAkseptert, value => setErklæringAkseptert(value))}
        </div>
        <div className="container">
          <BekreftKnapp onSubmit={handleSubmit} erklæringAkseptert={erklæringAkseptert} />
        </div>
      </form>
    </>
  );
};

export default Ansatte;
