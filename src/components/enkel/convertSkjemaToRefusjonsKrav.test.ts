import convertSkjemaToRefusjonsKrav from './convertSkjemaToRefusjonsKrav';

describe('convertSkjemaToRefusjonsKrav', () => {
  it('mapData', () => {});
  it('returns refusjonskrav given form data.', () => {
    const input = {
      fnr: '211124-28795',
      periode_0: '13.04.2020 til 30.12.2020',
      '': '',
      dager_0: '3',
      refusjon_0: '333,00'
    };

    const expected = {
      identitetsnummer: 'identity',
      perioder: [
        {
          antallDagerMedRefusjon: '3',
          beloep: '333.00',
          fom: '2020-04-13',
          tom: '2020-12-30'
        }
      ],
      virksomhetsnummer: 'arbeidsgiver'
    };

    const jsonData = convertSkjemaToRefusjonsKrav(
      input,
      'identity',
      'arbeidsgiver'
    );
    expect(jsonData).toEqual(expected);
  });
});
