import React from 'react';
import './Ansatte.less';
import {useAppStore} from '../../data/store/AppStore';
import {AnsattRad} from "./AnsattRad";
import {IsValid, Validering} from "../validering/Validering";
import {ByggValideringsFeil} from "./ByggValideringsFeil";
import Innsending from "./Innsending";
import {LeggTilKnapp} from "./LeggTilKnapp";
import {BekreftKnapp} from "./BekreftKnapp";
import {HjelpetekstRefusjon} from "./HjelpetekstRefusjon";
import {HjelpetekstDager} from "./HjelpetekstDager";
import {HjelpetekstPeriode} from "./HjelpetekstPeriode";
import {Eklæring} from "./Erklæring";
import {ValideringOppsummering} from "./ValideringOppsummering";
import {ValideringsFeil} from "./ValideringsFeil";

const Ansatte2 = () => {
  const {ansatte, feil, setFeil, arbeidsgiverId } = useAppStore();
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    const validerteAnsatte = Validering(ansatte)
    e.preventDefault();
    const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte);
    setFeil(
      ByggValideringsFeil(innsendteAnsatte)
    );
  };

  const handleFjernFeil = (slettetElement: number) => {
    const aktiveFeil = feil.filter((element: ValideringsFeil) => {
      return element.skjemaelementId !== `fnr_${slettetElement}`;
    });
    setFeil(aktiveFeil);
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="refusjonsform">
        <table className="AnsattTable">
          <tbody>
          <tr>
            <td>Rad</td>
            <td>
              <span>Fødselsnummer til ansatt:</span>
            </td>
            <td>
              <span>Hvilken periode var den ansatte borte?</span>
              {HjelpetekstPeriode()}
            </td>
            <td>
              <span>Antall dager det skulle vært utbetalt lønn</span>
              {HjelpetekstDager()}
            </td>
            <td>
              <span>Brutto beløp som  søkes refundert</span>
              {HjelpetekstRefusjon()}
            </td>
            <td></td>
          </tr>
          {
            ansatte.map((ansatt, index) => AnsattRad(ansatt.id, handleFjernFeil))
          }
          </tbody>
        </table>
        <LeggTilKnapp/>

        <ValideringOppsummering/>

        <div className="container">
          <Eklæring/>
        </div>
        <div className="container">
          <BekreftKnapp/>
        </div>
      </form>
    </>
  );
};

export default Ansatte2;
