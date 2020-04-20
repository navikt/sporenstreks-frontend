import React, { useState } from 'react';
import './Ansatte.less';

import { useAppStore } from '../../data/store/AppStore';
import { Feiloppsummering } from 'nav-frontend-skjema';

import { AnsattRad } from "./AnsattRad";
import { IsValid, Validering } from "../validering/Validering";
import { ValideringsFeil } from "./ValideringsFeil";
import { ByggValideringsFeil } from "./ByggValideringsFeil";
import Innsending from "./Innsending";
import {Normaltekst} from "nav-frontend-typografi";
import { LeggTilKnapp} from "./LeggTilKnapp";
import {BekreftKnapp } from "./BekreftKnapp";
import {HjelpetekstRefusjon} from "./HjelpetekstRefusjon";
import {HjelpetekstDager} from "./HjelpetekstDager";
import {HjelpetekstPeriode} from "./HjelpetekstPeriode";

const Ansatte2 = ({arbeidsgiverId}) => {
  const {ansatte, setAnsatte} = useAppStore();
   const [  feil, setFeil ] = useState<ValideringsFeil[]>([]);

  const handleSubmit = async(e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validerteAnsatte = Validering(ansatte)
    if (IsValid(validerteAnsatte)){
      setFeil([])
      const innsendteAnsatte = await Innsending(arbeidsgiverId, validerteAnsatte);
      setFeil(ByggValideringsFeil(innsendteAnsatte));
      setAnsatte(innsendteAnsatte);
    } else {
      setFeil(ByggValideringsFeil(validerteAnsatte))
      setAnsatte(validerteAnsatte);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="refusjonsform">
        <table className="AnsattTable">
          <tbody>
          <tr><td>Rad</td>
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
              <span>Brutto beløp som  søkes refundert</span>{HjelpetekstRefusjon()}
            </td>
            <td></td>
          </tr>
          {
            ansatte.map((ansatt, index) => AnsattRad(ansatt.id))
          }
          </tbody>
        </table>
        {
                    LeggTilKnapp()
                }
        {feil.length > 0 &&
        <Feiloppsummering
          tittel="Det er feil i skjemaet"
          feil={feil}
        />
        }
        <div className="container">
          <Normaltekst>
            Vi erklærer at det ikke er søkt om omsorgspenger og at arbeidstakeren ikke er permittert. Kravet er
            basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av koronaviruset,
            mistenkt smittet eller i lovpålagt karantene.
            <br /><br />
            Vær oppmerksom på at NAV kan foreta kontroller.
          </Normaltekst>
        </div>
        <div className="container">
          <BekreftKnapp/>
        </div>
      </form>
    </>
  );
};

export default Ansatte2;
