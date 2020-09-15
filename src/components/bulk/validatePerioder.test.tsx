import '@testing-library/jest-dom'

import { validatePerioder } from './validatePerioder';

describe('validatePerioder', () => {
  it('should return error message when we have two false dates', () => {
    const fom: string = 'undefined';
    const tom: string = 'undefined';
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });

  it('should return error message when we have tom as false date and fom is correct' , () => {
    const fom: string = '2020-12-12';
    const tom: string = 'undefined';
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });

  it('should return error message when we have fom as false date and tom is correct' , () => {
    const fom: string = 'undefined';
    const tom: string = '2020-12-12';
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });

  it('should return error message when we have fom as false date and tom is correct' , () => {
    const fom: string = '2020-11-11';
    const tom: string = '2020-12-12';
    const expected = undefined;

    expect(validatePerioder(fom, tom)).toEqual(expected);
  });
});
