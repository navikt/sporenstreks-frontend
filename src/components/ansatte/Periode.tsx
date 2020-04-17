import React from "react";
import {useAppStore} from "../../data/store/AppStore";
import dayjs from "dayjs";
import Flatpickr from 'react-flatpickr';
import {Norwegian} from 'flatpickr/dist/l10n/no.js';

export const Periode = (id: number) => {
    const {ansatte, setAnsatte} = useAppStore();
    const a = ansatte.find(a => a.id === id)
    const handleClose = (selectedDates) => {
        if (a){
            a.fom = dayjs(selectedDates[0]).format("YYYY-MM-DD")
            a.tom = dayjs(selectedDates[1]).format("YYYY-MM-DD")
        } else {
            console.warn("Fant ikke rad")
        }
        setAnsatte(ansatte)
    }
    let min = dayjs('1970-01-01').toDate();
    let max = dayjs(new Date()).add(1, 'year').toDate();
    return (<div>
        <Flatpickr
            placeholder='yyyy.mm.dd til yyyy.mm.dd'
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
                onClose: (selectedDates) => handleClose(selectedDates)
            }}
        />

        <span className={"skjemaelement__feilmelding"}>
            <p className={"typo-feilmelding"}>{a?.periodeError}</p>
        </span>
    </div>)
}
