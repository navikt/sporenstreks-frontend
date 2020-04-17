import {Ansatt} from "../../data/types/sporenstreksTypes";
import { validateFnr } from './validateFnr';
import { validatePerioder } from './validatePerioder';
import { validateNotNullAndPositive } from './validateNotNullAndPositive';

export const Validering = (ansatte: Ansatt[]) => {
    console.log(ansatte)
    
    ansatte.forEach(a => {
        a.fnrError = validateFnr(a.fnr);
        a.periodeError = validatePerioder(a.fom, a.tom);
        a.dagerError = validateNotNullAndPositive(a.antallDagerMedRefusjon);
        a.beloepError = validateNotNullAndPositive(a.beloep);
    });
    
    return ansatte
};

export const IsValid = (ansatte: Ansatt[]) => {
    return !ansatte.find(a => !!a.fnrError)
};
