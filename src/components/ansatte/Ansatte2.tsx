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

const Ansatte2 = () => {
    const {ansatte, setAnsatte} = useAppStore();
    const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
    const handleAddRad = () => {
        ansatte.push(byggAnsatt())
        setAnsatte(ansatte);
    }
    let feil: ValideringsFeil[] = [];
    const handleSubmit = async(e: React.FormEvent): Promise<void> => {
        const validerteAnsatte = Validering(ansatte)
        if (IsValid(validerteAnsatte)){
            feil = [];
            Innsending(arbeidsgiverId, validerteAnsatte)
        } else {
            setAnsatte(validerteAnsatte);
            feil = ByggValideringsFeil(ansatte)
        }
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="refusjonsform">
            <table>
                <tbody>
                    <tr>
                        <td>Fødselsnummer</td>
                        <td>Periode</td>
                        <td>Dager</td>
                        <td>Refusjon</td>
                        <td></td>
                    </tr>
                {
                    ansatte.map((ansatt, index) => AnsattRad(ansatt.id))
                }
                </tbody>
            </table>
            <Flatknapp onClick={handleAddRad}>Leggtil</Flatknapp>
            {feil.length > 0 &&
                <Feiloppsummering
                    tittel="Det er feil i skjemaet"
                    feil={feil}
                />
            }
            <div>
                <Knapp type="hoved">Send søknad om refusjon </Knapp>
            </div>
            </form>
        </>
    );
};

export default Ansatte2;
