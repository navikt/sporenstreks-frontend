import ByggValideringsFeil from './ByggValideringsFeil';
import { Ansatt, SkjemaStatus } from '../../data/types/sporenstreksTypes';

describe('ByggValideringsFeil', () => {
  it('should ', () => {
    const input: Ansatt[] = [
      {
        fnr: '1234',
        fnrError: 'fnr has error',
        fom: 'fom',
        tom: 'tom',
        id: 123,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      },
      {
        fnr: '1234',
        periodeError: 'periode has error',
        fom: 'fom',
        tom: 'tom',
        id: 234,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      },
      {
        fnr: '1234',
        dagerError: 'dager has error',
        fom: 'fom',
        tom: 'tom',
        id: 345,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      },
      {
        fnr: '1234',
        beloepError: 'beloep has error',
        fom: 'fom',
        tom: 'tom',
        id: 456,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      }
    ];

    const expected = [
      {
        feilmelding: 'Det er en feil i rad nr 1',
        skjemaelementId: 'fnr_123'
      },
      {
        feilmelding: 'Det er en feil i rad nr 2',
        skjemaelementId: 'fnr_234'
      },
      {
        feilmelding: 'Det er en feil i rad nr 3',
        skjemaelementId: 'fnr_345'
      },
      {
        feilmelding: 'Det er en feil i rad nr 4',
        skjemaelementId: 'fnr_456'
      }
    ];

    expect(ByggValideringsFeil(input)).toEqual(expected);
  });
});
