import React from 'react';
import './Ansatte.less';
import {byggAnsatt} from '../../data/types/sporenstreksTypes';
import {useAppStore} from '../../data/store/AppStore';
import {Feiloppsummering} from 'nav-frontend-skjema';
import {Flatknapp, Knapp} from "nav-frontend-knapper";
import {AnsattRad} from "./AnsattRad";
import {useForm} from "react-hook-form";
import {Validering} from "./Validering";
import {ValideringsFeil} from "./ValideringsFeil";
import {ByggValideringsFeil} from "./ByggValideringsFeil";

const Ansatte2 = () => {
    const {ansatte, setAnsatte} = useAppStore();
    const methods = useForm();
    const handleAddRad = () => {
        ansatte.push(byggAnsatt())
        setAnsatte(ansatte);
    }
    const isValid = () => {
        return false;
    }
    let feil: ValideringsFeil[] = [];
    const handleSubmit = async(e: any): Promise<void> => {
        console.log("Submitter")
        if (isValid()){
           feil = [];
        } else {
            setAnsatte(Validering(ansatte));
            feil = ByggValideringsFeil(ansatte)
        }
    }

    return (
        <>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="refusjonsform">
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
                <Knapp type="hoved"> Send søknad om refusjon </Knapp>
            </div>
            </form>
        </>
    );
};

export default Ansatte2;
