import React, {useState} from 'react';
import './Ansatte.less';
import {byggAnsatt} from '../../data/types/sporenstreksTypes';
import {useAppStore} from '../../data/store/AppStore';
import {Feiloppsummering} from 'nav-frontend-skjema';
import {Flatknapp, Knapp} from "nav-frontend-knapper";
import {AnsattRad} from "./AnsattRad";
import {IsValid, Validering} from "../validering/Validering";
import {ValideringsFeil} from "./ValideringsFeil";
import {ByggValideringsFeil} from "./ByggValideringsFeil";
import {Innsending} from "./Innsending";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {Normaltekst} from "nav-frontend-typografi";

const Ansatte2 = () => {
    const {ansatte, setAnsatte} = useAppStore();
    const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
    const [ feil, setFeil ] = useState<ValideringsFeil[]>([]);
    const handleAddRad = () => {
        ansatte.push(byggAnsatt())
        setAnsatte(ansatte);
    }
    const handleSubmit = async(e: React.FormEvent): Promise<void> => {
        const validerteAnsatte = Validering(ansatte)
        if (IsValid(validerteAnsatte)){
            setFeil([])
            Innsending(arbeidsgiverId, validerteAnsatte)
        } else {
            setFeil(ByggValideringsFeil(validerteAnsatte))
            setAnsatte(validerteAnsatte);
        }
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="refusjonsform">
            <table className="AnsattTable">
                <tbody>
                    <tr>
                        <td>
                            <span>Fødselsnummer til ansatt:</span>
                        </td>
                        <td>
                            <span>Hvilken periode var den ansatte borte?</span>
                            <Hjelpetekst>Fra og med første, til og med siste fraværsdag i arbeidsgiverperioden</Hjelpetekst>
                        </td>
                        <td>
                            <span>Antall dager det skulle vært utbetalt lønn</span>
                            <Hjelpetekst>
                                <li>Her teller du dagene det skulle vært utbetalt lønn fra og med dag 4 i arbeidsgiverperioden. Helger og helligdager kan tas med hvis de er en del av den faste arbeidstiden.</li>
                                <li>Var noen av fraværsdagene før 16. mars, kan du ikke ta dem med.</li>
                            </Hjelpetekst>
                        </td>
                        <td>
                            <span>Brutto beløp som  søkes refundert</span>
                        </td>
                        <td></td>
                    </tr>
                {
                    ansatte.map((ansatt, index) => AnsattRad(ansatt.id))
                }
                </tbody>
            </table>
            <Flatknapp onClick={handleAddRad}>Legg til enda en ansatt</Flatknapp>
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
                    <Knapp type="hoved">Send søknad om refusjon </Knapp>
                </div>
            </form>
        </>
    );
};

export default Ansatte2;
