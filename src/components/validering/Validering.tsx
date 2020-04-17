import {Ansatt} from "../../data/types/sporenstreksTypes";
import { validateFnr } from './validateFnr';
import { validatePerioder } from './validatePerioder';
import { validateNotNullAndPositive } from './validateNotNullAndPositive';

export const Validering = (ansatte: Ansatt[]) => {
    console.log("Validering", ansatte)
    
    ansatte.forEach(a => {
        a.fnrError = validateFnr(a.fnr);
        a.periodeError = validatePerioder(a.fom, a.tom);
        a.dagerError = validateNotNullAndPositive(a.antallDagerMedRefusjon);
        a.beloepError = validateNotNullAndPositive(a.beloep);
    });
    
    return ansatte
};

export const IsValid = (ansatte: Ansatt[]) => {
    ansatte.forEach(a => {
        if (a.fnrError){
            return false;
        }
        if (a.periodeError){
            return false;
        }
        if (a.dagerError){
            return false;
        }
        if (a.beloepError){
            return false;
        }
    });
    return true;
};
