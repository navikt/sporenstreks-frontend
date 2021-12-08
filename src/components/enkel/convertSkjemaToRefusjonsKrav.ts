import dayjs from 'dayjs';
import { Periode, RefusjonsKrav } from '../../data/types/sporenstreksTypes';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const formaterDato = (noDato: string): string =>
  dayjs(noDato, 'DD.MM.YYYY').format('YYYY-MM-DD');

const convertSkjemaToRefusjonsKrav = (
  data,
  identityNumberInput: string,
  arbeidsgiverId: string
): RefusjonsKrav => {
  const antallPerioder = (Object.keys(data).length - 2) / 4;
  let perioder: Periode[] = [];
  for (let i = 0; i < antallPerioder; i++) {
    const periode: Periode = {
      fom: formaterDato(data['periode_' + i + '_fom']),
      tom: formaterDato(data['periode_' + i + '_tom']),
      antallDagerMedRefusjon: data['dager_' + i].replace(/ /g, ''),
      beloep: data['refusjon_' + i]
        .replace(/ /g, '')
        .replace(/\s/g, '')
        .replace(',', '.')
    };
    perioder.push(periode);
  }

  return {
    identitetsnummer: identityNumberInput,
    virksomhetsnummer: arbeidsgiverId,
    perioder: perioder
  };
};

export default convertSkjemaToRefusjonsKrav;
