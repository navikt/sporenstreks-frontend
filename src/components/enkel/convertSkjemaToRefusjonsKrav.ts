import { Periode, RefusjonsKrav } from '../../data/types/sporenstreksTypes';

const convertSkjemaToRefusjonsKrav = (
  data,
  identityNumberInput: string,
  arbeidsgiverId: string
): RefusjonsKrav => {
  const antallPerioder = (Object.keys(data).length - 2) / 4;
  let perioder: Periode[] = [];
  for (let i = 0; i < antallPerioder; i++) {
    const periode: Periode = {
      fom: data['periode_' + i + '_fom'],
      tom: data['periode_' + i + '_tom'],
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
