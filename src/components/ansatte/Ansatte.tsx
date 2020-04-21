import React from 'react';
import './Ansatte.less';
import {useAppStore} from '../../data/store/AppStore';
import {AnsattRad} from "./AnsattRad";
import {Validering} from "../validering/Validering";
import {ByggValideringsFeil} from "./ByggValideringsFeil";
import Innsending from "./Innsending";
import {LeggTilKnapp} from "./LeggTilKnapp";
import {BekreftKnapp} from "./BekreftKnapp";
import {HjelpetekstRefusjon} from "./HjelpetekstRefusjon";
import {HjelpetekstDager} from "./HjelpetekstDager";
import {HjelpetekstPeriode} from "./HjelpetekstPeriode";
import {Eklæring} from "./Erklæring";
import {ValideringOppsummering} from "./ValideringOppsummering";

const Ansatte = () => {
  const {ansatte, setFeil, arbeidsgiverId, setLoadingStatus } = useAppStore();
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validerteAnsatte = Validering(ansatte);
    const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte, setLoadingStatus);
    setFeil(
      ByggValideringsFeil(innsendteAnsatte)
    );
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
            ansatte.map((ansatt) => AnsattRad(ansatt.id))
          }
          </tbody>
        </table>
        <LeggTilKnapp/>

        <ValideringOppsummering/>

        <div className="container">
          <Eklæring/>
        </div>
        <div className="container">
          {
            BekreftKnapp(handleSubmit)
          }
        </div>
      </form>
    </>
  );
};

export default Ansatte;
