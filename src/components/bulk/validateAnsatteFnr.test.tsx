import '@testing-library/jest-dom'
import { validateAnsatteFnr } from './validateAnsatteFnr';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { Ansatt } from './Ansatt';
import { TestFnr } from '../fnr/TestFnr';

describe('validateFnr', () => {
  it('should validate that everything is OK', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = undefined;

    expect(validateAnsatteFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that fødselsnummer is missing', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fom: '',
        tom: '',
        fnr: undefined,
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = 'Fødselsnummer må fylles ut';

    expect(validateAnsatteFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not more', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: TestFnr.Ugyldige.ForLangt,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = 'Fødselsnummer må ha 11 siffer';

    expect(validateAnsatteFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not less', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: '27036405',
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = 'Fødselsnummer må ha 11 siffer';

    expect(validateAnsatteFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer control numbers must not be invalid', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: TestFnr.Ugyldige.UgyldigKontrollSiffer,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = 'Fødselsnummer er ugyldig';

    expect(validateAnsatteFnr(input, input[0])).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must not be used more than once', () => {
    const input: Ansatt[] = [
      {
        id: 1,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected = 'Fødselsnummer er allerede brukt';

    expect(validateAnsatteFnr(input, input[0])).toEqual(expected);
  });
});
