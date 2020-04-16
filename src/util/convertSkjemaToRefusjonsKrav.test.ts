import convertSkjemaToRefusjonsKrav from './convertSkjemaToRefusjonsKrav';

describe('convertSkjemaToRefusjonsKrav', () => {
  it('returns refusjonskrav given form data.', () => {
    const input = {
        fnr: "211124-28795",
        periode_0: "2020-04-01 til 2020-04-07",
        "" : "",
        antall_0: "3",
        beloep_0: "333,00"
    }

    const expected = {
        "identitetsnummer": "identity",
        "perioder": [
        {
            "antallDagerMedRefusjon": "3",
            "beloep": "333.00",
            "fom": "2020-04-01",
            "tom": "2020-04-07",
        },
        ],
        "virksomhetsnummer": "arbeidsgiver",
      }

    const jsonData = convertSkjemaToRefusjonsKrav(input, "identity", "arbeidsgiver");
    expect(jsonData).toEqual(expected);
  });
});
