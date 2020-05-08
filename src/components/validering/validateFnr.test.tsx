import '@testing-library/jest-dom'

import { validateFnr } from './validateFnr';
import { Ansatt, SkjemaStatus } from '../../data/types/sporenstreksTypes';


describe('validateFnr', () => {
  it('should validate that everything is OK', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: "27036405924",
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: "30040658641",
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = undefined;

    expect(validateFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that fødselsnummer is missing', () => {
    const input: Ansatt[] = [
      {
        id: 1,



        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: "30040658641",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = "Fødselsnummer må fylles ut";

    expect(validateFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not more', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: "270364059200",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: "30040658641",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = "Fødselsnummer må ha 11 siffer";

    expect(validateFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not less', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: "27036405",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: "30040658641",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = "Fødselsnummer må ha 11 siffer";

    expect(validateFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must not be invalid', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: "27036405000",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: "30040658641",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = "Fødselsnummer er ugyldig";

    expect(validateFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must not be used more than once', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: "30040658641",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: "30040658641",


        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = "Fødselsnummer er allerede brukt";

    expect(validateFnr(input, input[0])).toEqual(expected);
  });
});
