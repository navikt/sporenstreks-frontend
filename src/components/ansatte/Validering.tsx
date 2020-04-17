import {Ansatt} from "../../data/types/sporenstreksTypes";

export const Validering = (ansatte: Ansatt[]) => {
    ansatte.forEach(a => {
        a.fnrError = !a.fnr ? "Feil" : ""
    })
    ansatte.forEach(a => {
        a.periodeError = !a.fom ? "Feil" : ""
    })
    ansatte.forEach(a => {
        a.dagerError = !a.antallDagerMedRefusjon ? "Feil" : ""
    })
    ansatte.forEach(a => {
        a.beloepError = !a.beloep ? "Feil" : ""
    })
    return ansatte
}
