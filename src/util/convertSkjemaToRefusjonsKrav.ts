import { Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';

const convertSkjemaToRefusjonsKrav = (data, identityNumberInput: string, arbeidsgiverId: string): RefusjonsKrav => {
    const antallPerioder = (Object.keys(data).length - 2) / 3;
    let perioder: Periode[] = [];

    for (let i = 0; i < antallPerioder; i++) {
      const days = data['periode_' + i].split(' til ');
      const periode: Periode = {
        fom: days[0],
        tom: days[1] ?? days[0],
        antallDagerMedRefusjon: data['antall_' + i].replace(/ /g, ''),
        beloep: data['beloep_' + i].replace(/ /g, '')
          .replace(/\s/g, '')
          .replace(',', '.'),
      };
      console.log('days: ', days) // eslint-disable-line no-console

      perioder.push(periode)
    }

    return {
      identitetsnummer: identityNumberInput,
      virksomhetsnummer: arbeidsgiverId,
      perioder: perioder
    };
  };

  export default convertSkjemaToRefusjonsKrav;
