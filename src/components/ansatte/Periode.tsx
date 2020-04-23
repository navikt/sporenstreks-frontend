import React from "react";
import {useAppStore} from "../../data/store/AppStore";
import dayjs from "dayjs";
import Flatpickr from 'react-flatpickr';
import {Norwegian} from 'flatpickr/dist/l10n/no.js';
import { AnsattID } from "../../data/types/sporenstreksTypes";
import "./Periode.less";

export const Periode = (props: AnsattID) => {
    const {ansatte, setAnsatte} = useAppStore();
    const a = ansatte.find(a => a.id === props.id)
    let errorClass = '';
    const handleClose = (selectedDates) => {
        if (a){
            a.fom = dayjs(selectedDates[0]).format("YYYY-MM-DD")
            a.tom = dayjs(selectedDates[1]).format("YYYY-MM-DD")
        }
        setAnsatte([...ansatte]);
    }
    let min = dayjs('1970-01-01').toDate();
    let max = dayjs(new Date()).add(1, 'year').toDate();

    if(a?.periodeError) {
      errorClass = 'dato-har-feil';
    }
    return (<div className={`skjemaelement ${errorClass}`}>
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

        <div aria-live="polite">
            <span className={"skjemaelement__feilmelding"}>
                <p className={"typo-feilmelding"}>{a?.periodeError}</p>
            </span>
        </div>
    </div>)
}

export default Periode;
