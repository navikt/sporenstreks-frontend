import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Periode } from '../../data/types/sporenstreksTypes';

export const ByggFeilmeldinger = (arbeidsgiverId: string, identityNumberInput: string, perioder: Periode[]) => {
  let liste : FeiloppsummeringFeil[] = []
  if (!arbeidsgiverId) {
    let v = {} as FeiloppsummeringFeil;
    v.feilmelding = 'Arbeidsgiver må fylles ut';
    v.skjemaelementId = 'fnr';
    liste.push(v);
  }
  if (!identityNumberInput) {
    let v = {} as FeiloppsummeringFeil;
    v.feilmelding = 'Fødselsnummer må fylles ut';
    v.skjemaelementId = 'fnr';
    liste.push(v);
  }
  perioder.forEach( p => {
    if (!p.fom || !p.tom){
      let v = {} as FeiloppsummeringFeil;
      v.feilmelding = 'Velg periode';
      v.skjemaelementId = 'rad1';
      liste.push(v);
    }
  })
  return liste;
}
