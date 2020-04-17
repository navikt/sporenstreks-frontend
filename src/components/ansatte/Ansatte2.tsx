import React from 'react';
import './Ansatte.less';
import {byggAnsatt} from '../../data/types/sporenstreksTypes';
import {useAppStore} from '../../data/store/AppStore';
import {Feiloppsummering} from 'nav-frontend-skjema';
import {Flatknapp} from "nav-frontend-knapper";
import {AnsattRad} from "./AnsattRad";

const Ansatte2 = () => {
    const {ansatte, setAnsatte} = useAppStore();
    const deleteRad = (id: number) => {
        const arr = ansatte.filter( a => a.id !== id);
        setAnsatte(arr);
    }
    const handleAddRad = () => {
        ansatte.push(byggAnsatt())
        setAnsatte(ansatte);
    }
    const feil = [
        {skjemaelementId: '1', feilmelding: 'Du må oppgi et navn'},
        {skjemaelementId: '2', feilmelding: 'Du må oppgi en adresse'},
        {skjemaelementId: '3', feilmelding: 'Du må oppgi et telefonnummer'}
    ]
    return (
        <>
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
                    ansatte.map((ansatt, index) => AnsattRad(ansatt, deleteRad))
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
        </>
    );
};

export default Ansatte2;
