import '@testing-library/jest-dom'

import { valideringAnsatte, isAnsatteValid } from './ValideringAnsatte';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { Ansatt } from './Ansatt';

// TODO - Legg inn test på at beløp er for høyt

describe('ValideringAnsatte', () => {
  it('should validate the input data and report invalid dates', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: '27036405924',
        fom: '',
        tom: '',
        antallDagerMedRefusjon: 2,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: '30040658641',
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
        'antallDagerMedRefusjon': 2,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': undefined,
        'fnr': '27036405924',
        'fnrError': undefined,
        'fom': '',
        'id': 123,
        'oppdatert': 1,
        'periodeError': 'Perioden må ha 2 gyldige datoer',
        'status': 0,
        'tom': '',
      },
      {
        'antallDagerMedRefusjon': 2,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': undefined,
        'fnr': '30040658641',
        'fnrError': undefined,
        'fom': '',
        'id': 123,
        'oppdatert': 1,
        'periodeError': 'Perioden må ha 2 gyldige datoer',
        'status': 0,
        'tom': '',
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid number of days', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: '27036405924',
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: undefined,
        beloep: 123,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: '30040658641',
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
        'antallDagerMedRefusjon': undefined,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': 'Feltet må fylles ut',
        'fnr': '27036405924',
        'fnrError': undefined,
        'fom': '2020-01-01',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-02-02',
      },
      {
        'antallDagerMedRefusjon': -1,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': 'Dager må være 0 eller høyere',
        'fnr': '30040658641',
        'fnrError': undefined,
        'fom': '2020-03-03',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-04-04',
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid fnr', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: '27036405924123',
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
        'antallDagerMedRefusjon': 1,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': undefined,
        'fnr': '27036405924123',
        'fnrError': 'Fødselsnummer må ha 11 siffer',
        'fom': '2020-01-01',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-02-02',
      },
      {
        'antallDagerMedRefusjon': 1,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': undefined,
        'fnr': undefined,
        'fnrError': 'Fødselsnummer må fylles ut',
        'fom': '2020-03-03',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-04-04',
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report invalid beløp', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: '27036405924',
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: 1,
        beloep: undefined,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 123,
        fnr: '30040658641',
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
        'antallDagerMedRefusjon': 1,
        'beloep': undefined,
        'beloepError': 'Beløp må fylles ut',
        'dagerError': undefined,
        'fnr': '27036405924',
        'fnrError': undefined,
        'fom': '2020-01-01',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-02-02',
      },
      {
        'antallDagerMedRefusjon': 1,
        'beloep': -123,
        'beloepError': 'Beløpet er for lavt',
        'dagerError': undefined,
        'fnr': '30040658641',
        'fnrError': undefined,
        'fom': '2020-03-03',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-04-04',
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeFalsy();
  });

  it('should validate the input data and report everything OK', () => {
    const input: Ansatt[] = [
      {
        id: 123,
        fnr: '27036405924',
        fom: '2020-01-01',
        tom: '2020-02-02',
        antallDagerMedRefusjon: 1,
        beloep: 1234,
        status: SkjemaStatus.NY,
        oppdatert: 1
      },
      {
        id: 1234,
        fnr: '30040658641',
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
        'antallDagerMedRefusjon': 1,
        'beloep': 1234,
        'beloepError': undefined,
        'dagerError': undefined,
        'fnr': '27036405924',
        'fnrError': undefined,
        'fom': '2020-01-01',
        'id': 123,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-02-02',
      },
      {
        'antallDagerMedRefusjon': 1,
        'beloep': 123,
        'beloepError': undefined,
        'dagerError': undefined,
        'fnr': '30040658641',
        'fnrError': undefined,
        'fom': '2020-03-03',
        'id': 1234,
        'oppdatert': 1,
        'periodeError': undefined,
        'status': 0,
        'tom': '2020-04-04',
      }
    ];

    expect(valideringAnsatte(input)).toEqual(expected);
    expect(isAnsatteValid(valideringAnsatte(input))).toBeTruthy();
  });
});
