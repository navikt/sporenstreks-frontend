import { Periode, RefusjonsKrav } from '../../data/types/sporenstreksTypes';

const mapDate = (str) => {
  let arr = str.split('.');
  return arr[2] + '-' + arr[1] + '-' + arr[0];
};

const mapDates = (dates) => {
  return [mapDate(dates[0]), mapDate(dates[1])];
};

const convertSkjemaToRefusjonsKrav = (
  data,
  identityNumberInput: string,
  arbeidsgiverId: string
): RefusjonsKrav => {
  const antallPerioder = (Object.keys(data).length - 2) / 3;
  let perioder: Periode[] = [];

  for (let i = 0; i < antallPerioder; i++) {
    const days = mapDates(data['periode_' + i].split(' til '));
    const periode: Periode = {
      fom: days[0],
      tom: days[1] ?? days[0],
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
