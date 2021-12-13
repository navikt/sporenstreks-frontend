import '@testing-library/jest-dom';

import { valideringAnsatte, isAnsatteValid } from './ValideringAnsatte';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { Ansatt } from './Ansatt';
import { TestFnr } from '../fnr/TestFnr';

// TODO - Legg inn test på at beløp er for høyt

describe('ValideringAnsatte', () => {
  it('should validate the input data and report invalid dates', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected: Ansatt[] = [
      {
        antallDagerMedRefusjon: 2,
        beloep: 123,
        beloepError: undefined,
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fnrError: undefined,
        fom: '',
        fomError: 'Det må være en gyldig dato',
        id: 123,
        oppdatert: 1,
        periodeError: 'Perioden må ha 2 gyldige datoer',
        status: 0,
        tom: '',
        tomError: 'Det må være en gyldig dato'
      },
      {
        antallDagerMedRefusjon: 2,
        beloep: 123,
        beloepError: undefined,
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fnrError: undefined,
        fom: '',
        fomError: 'Det må være en gyldig dato',
        id: 123,
        oppdatert: 1,
        periodeError: 'Perioden må ha 2 gyldige datoer',
        status: 0,
        tom: '',
        tomError: 'Det må være en gyldig dato'
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid number of days', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: undefined,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '2020-03-03',
        tom: '2020-04-04',
        antallDagerMedRefusjon: -1,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected: Ansatt[] = [
      {
        antallDagerMedRefusjon: undefined,
        beloep: 123,
        beloepError: undefined,
        dagerError: 'Feltet må fylles ut',
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fnrError: undefined,
        fom: '2020-01-01',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-02-02'
      },
      {
        antallDagerMedRefusjon: -1,
        beloep: 123,
        beloepError: undefined,
        dagerError: 'Dager må være 0 eller høyere',
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fnrError: undefined,
        fom: '2020-03-03',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-04-04'
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid fnr', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: TestFnr.Ugyldige.ForLangt,
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: 1,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: undefined,
        fom: '2020-03-03',
        tom: '2020-04-04',
        antallDagerMedRefusjon: 1,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected: Ansatt[] = [
      {
        antallDagerMedRefusjon: 1,
        beloep: 123,
        beloepError: undefined,
        dagerError: undefined,
        fnr: TestFnr.Ugyldige.ForLangt,
        fnrError: 'Fødselsnummer må ha 11 siffer',
        fom: '2020-01-01',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-02-02'
      },
      {
        antallDagerMedRefusjon: 1,
        beloep: 123,
        beloepError: undefined,
        dagerError: undefined,
        fnr: undefined,
        fnrError: 'Fødselsnummer må fylles ut',
        fom: '2020-03-03',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-04-04'
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid beløp', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: 1,
        beloep: undefined,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '2020-03-03',
        tom: '2020-04-04',
        antallDagerMedRefusjon: 1,
        beloep: -123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected: Ansatt[] = [
      {
        antallDagerMedRefusjon: 1,
        beloep: undefined,
        beloepError: 'Beløp må fylles ut',
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fnrError: undefined,
        fom: '2020-01-01',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-02-02'
      },
      {
        antallDagerMedRefusjon: 1,
        beloep: -123,
        beloepError: 'Beløpet er for lavt',
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fnrError: undefined,
        fom: '2020-03-03',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-04-04'
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid antallDagerMedRefusjon and beloep combination', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '2020-03-03',
        tom: '2020-04-04',
        antallDagerMedRefusjon: 0,
        beloep: 666,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected: Ansatt[] = [
      {
        antallDagerMedRefusjon: 0,
        beloep: 666,
        beloepError: 'Beløpet må være 0 når antall dager med refusjon er 0',
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fnrError: undefined,
        fom: '2020-03-03',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-04-04'
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report everything OK', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: 1,
        beloep: 1234,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 1234,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fom: '2020-03-03',
        tom: '2020-04-04',
        antallDagerMedRefusjon: 1,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      }
    ];

    const expected: Ansatt[] = [
      {
        antallDagerMedRefusjon: 1,
        beloep: 1234,
        beloepError: undefined,
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson1,
        fnrError: undefined,
        fom: '2020-01-01',
        id: 123,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-02-02'
      },
      {
        antallDagerMedRefusjon: 1,
        beloep: 123,
        beloepError: undefined,
        dagerError: undefined,
        fnr: TestFnr.GyldigeFraDolly.TestPerson2,
        fnrError: undefined,
        fom: '2020-03-03',
        id: 1234,
        oppdatert: 1,
        periodeError: undefined,
        status: 0,
        tom: '2020-04-04'
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeTruthy();
  });
});
