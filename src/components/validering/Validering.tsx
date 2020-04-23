import {Ansatt} from "../../data/types/sporenstreksTypes";
import { validateFnr } from './validateFnr';
import { validatePerioder } from './validatePerioder';
import { validateNotNullAndPositive } from './validateNotNullAndPositive';
import {validateMaksBeloep} from "./validateMaksBeloep";

export const Validering = (ansatte: Ansatt[]) => {
    ansatte.forEach(a => {
        a.fnrError = validateFnr(ansatte, a);
        a.periodeError = validatePerioder(a.fom, a.tom);
        a.dagerError = validateNotNullAndPositive(a.antallDagerMedRefusjon);
        a.beloepError = validateMaksBeloep(a.beloep);
    });

    return ansatte
};

export const IsValid = (ansatte: Ansatt[]) => {
    let isValid = true
    ansatte.forEach(a => {
        if (a.fnrError){
            isValid = false;
        }
        if (a.periodeError){
            isValid = false;
        }
        if (a.dagerError){
            isValid = false;
        }
        if (a.beloepError){
            isValid = false;
        }
    });
    return isValid;
};
