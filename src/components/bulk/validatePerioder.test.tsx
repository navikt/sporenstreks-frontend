import '@testing-library/jest-dom';

import { validatePerioder } from './validatePerioder';

describe('validatePerioder', () => {
  it('should return error message when we have two false dates', () => {
    const fom = 'undefined';
    const tom = 'undefined';
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });

  it('should return error message when we have tom as false date and fom is correct', () => {
    const fom = '2020-12-12';
    const tom = 'undefined';
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });

  it('should return error message when we have fom as false date and tom is correct', () => {
    const fom = 'undefined';
    const tom = '2020-12-12';
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });

  it('should return error message when we have fom as false date and tom is correct', () => {
    const fom = '2020-11-11';
    const tom = '2020-12-12';
    const expected = undefined;

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });
});
