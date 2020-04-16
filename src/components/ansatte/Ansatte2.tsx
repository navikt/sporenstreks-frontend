import React, {useState} from 'react';
import './Ansatte.less';
import {Ansatt} from '../../data/types/sporenstreksTypes';
import {useAppStore} from '../../data/store/AppStore';
import {Feiloppsummering, FnrInput, Input} from 'nav-frontend-skjema';
import {Flatknapp} from "nav-frontend-knapper";
import Flatpickr from 'react-flatpickr';
import {Controller} from "react-hook-form";
import dayjs from "dayjs";
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import useForceUpdate from "use-force-update";

const AnsattRad = (
    idx: number,
    deleteRad: any,
    setFnr: any,
    setFnrValid: any,
    setPeriode: any,
    setDager: any,
    setRefusjon: any,
    fnr?: number,
    fom?: string,
    tom?: string,
    fnrError?: boolean,
    dager?: number,
    refusjon?: number
) => {
    const setValid = (valid: boolean) => {
        console.log("isValid", valid);
        setFnrValid(idx, fnrError)
    }

    let min = dayjs('1970-01-01').toDate();
    let max = dayjs(new Date()).add(1, 'year').toDate();

    const validatePeriode = (selectedDates): boolean => {
        return true
    };

    console.log("dager", dager)

    return (
        <tr key={idx}>
            <td><FnrInput
              id="fnr"
              name="fnr"
              bredde="M"
              maxLength={11}
              label="Fødselsnummer til arbeidstaker"
              value={fnr}
              onChange={(e) => setFnr(e.target.value, idx)}
              onValidate={(valid) => setValid(valid )}
              feil={fnrError ? "Error" : ""}
          /></td>
            <td>
                <Flatpickr
                    placeholder='dd.mm.yyyy til dd.mm.yyyy'
                    value={"123123"}
                    onChange={setPeriode}
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
                <Input label={"Dager"}
                       name={"dager_"+idx}
                       bredde="M"
                       value={dager}
                       onChange={evt => setDager(idx, evt.target.value)}
                       inputMode={"numeric"}/>
            </td>
            <td>
                <Input label={"Refusjon"}
                       name={"refusjon_"+idx}
                       bredde="M"
                       value={refusjon}
                       onChange={evt => setRefusjon(idx, parseInt(evt.target.value))}
                       />
            </td>
            <td>
                <Flatknapp
                    onClick={evt => {deleteRad(idx); evt.preventDefault()}}>Slett</Flatknapp>
            </td>
        </tr>
    )
}

const Ansatte2 = () => {
    const {ansatte, setAnsatte} = useAppStore();
    console.log("Antasatte2", ansatte)
    const deleteRad = (idx: number) => {
        console.log("deleteRad", idx)
        ansatte.splice(idx, 1)
        setAnsatte(ansatte);
    }
    const setFnr = (fnr: number, idx: number) => {
        console.log("Fødselsnr", idx, fnr)
        ansatte[idx].fnr = fnr
        setAnsatte(ansatte);
    }
    const setFnrValid = (idx: number, valid: boolean) => {
        console.log("setFnrValid", idx, valid)
    }

    const setPeriode = (idx: number, periode: string) => {
        console.log("setPeriode", idx, periode)
    }

    const setRefusjon = (idx: number, refusjon: number) => {
        console.log("setRefusjon", idx, refusjon)
        ansatte[idx].beloep = refusjon
        setAnsatte(ansatte);
    }
    const setDager = (idx: number, dager: number) => {
        console.log("setDager", idx, dager)
        ansatte[idx].antallDagerMedRefusjon = dager
        setAnsatte(ansatte);
    }
    const feil=[
        { skjemaelementId: '1', feilmelding: 'Du må oppgi et navn' },
        { skjemaelementId: '2', feilmelding: 'Du må oppgi en adresse' },
        { skjemaelementId: '3', feilmelding: 'Du må oppgi et telefonnummer' }
    ]
  return (
    <>
        <table>
            <tbody>
        {
            ansatte.map((ansatt: Ansatt, idx) => AnsattRad(idx,
                deleteRad,
                setFnr,
                setFnrValid,
                setPeriode,
                setDager,
                setRefusjon,
                ansatt.fnr,
                ansatt.fom,
                ansatt.tom,
                ansatt.fnrError,
                ansatt.antallDagerMedRefusjon,
                ansatt.beloep
            ))
        }
            </tbody>
        </table>
        {feil.length > 0 &&
            <Feiloppsummering
                tittel="For å gå videre må du rette opp følgende:"
                feil={feil}
            />
        }
    </>
  );
};

export default Ansatte2;
