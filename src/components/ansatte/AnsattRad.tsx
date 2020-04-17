import React from 'react';
import './Ansatte.less';
import {Ansatt} from '../../data/types/sporenstreksTypes';
import {FnrInput} from 'nav-frontend-skjema';
import {Flatknapp} from "nav-frontend-knapper";
import Flatpickr from 'react-flatpickr';
import dayjs from "dayjs";
import {Norwegian} from 'flatpickr/dist/l10n/no.js';
import {Dager} from "./Dager";
import {Refusjon} from "./Refusjon";

export const AnsattRad = (
    ansatt: Ansatt,
    deleteRad: any
) => {
    let min = dayjs('1970-01-01').toDate();
    let max = dayjs(new Date()).add(1, 'year').toDate();
    const validatePeriode = (selectedDates): boolean => {
        return true
    };
    return (
        <tr key={ansatt.id}>
            <td>
                <FnrInput
                    bredde="M"
                    maxLength={11}
                    value={ansatt.fnr}
                    onChange={(e) => {}}
                    onValidate={() => console.log("valid")}
                    feil={""}
                />
            </td>
            <td>
                <Flatpickr
                    placeholder='dd.mm.yyyy til dd.mm.yyyy'
                    className={"skjemaelement__input"}
                    options={{
                        minDate: min,
                        maxDate: max,
                        mode: 'range',
                        enableTime: false,
                        dateFormat: 'Y-m-d',
                        altInput: true,
                        altFormat: 'Y-m-d',
                        locale: Norwegian,
                        allowInput: true,
                        clickOpens: true,
                        onClose: (selectedDates) => validatePeriode(selectedDates)
                    }}
                /></td>
            <td>
                <Dager
                    antall={ansatt.antallDagerMedRefusjon}
                    onChange={(e) => {}}
                />
            </td>
            <td>
                <Refusjon
                    refusjon={ansatt.beloep}
                    onChange={(e) => {}}
                />
            </td>
            <td>
                <Flatknapp
                    onClick={evt => {
                        deleteRad(ansatt.id);
                        evt.preventDefault()
                    }}>Slett</Flatknapp>
            </td>
        </tr>
    )
}
