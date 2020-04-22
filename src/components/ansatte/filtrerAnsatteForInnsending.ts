import {Ansatt} from "../../data/types/sporenstreksTypes";
import {SykepengerData} from "./SykepengerData";

function filtrerAnsatteForInnsending(validerteAnsatte: Ansatt[], arbeidsgiverId: string): SykepengerData[] {
  return validerteAnsatte.map((ansatt: Ansatt) => {
    return {
      identitetsnummer: ansatt.fnr,
      virksomhetsnummer: arbeidsgiverId,
      perioder: [
        {
          fom: ansatt.fom,
          tom: ansatt.tom,
          antallDagerMedRefusjon: ansatt.antallDagerMedRefusjon,
          beloep: ansatt.beloep
        }
      ]
    };
  });
}

export default filtrerAnsatteForInnsending;
