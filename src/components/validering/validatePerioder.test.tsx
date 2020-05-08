import '@testing-library/jest-dom'

import { validatePerioder } from './validatePerioder';

describe('validatePerioder', () => {
  it('should return error message when we have two false dates', () => {
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder()).toEqual(expected);
  });

  it('should return error message when we have tom as false date and fom is correct' , () => {
    const fom: Date = new Date(2020,12,12 )
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(fom)).toEqual(expected);
  });

  it('should return error message when we have fom as false date and tom is correct' , () => {
    const expected = 'Perioden må ha 2 gyldige datoer';

    expect(validatePerioder(undefined, new Date(2020,12,12))).toEqual(expected);
  });

  it('should return error message when we have fom as false date and tom is correct' , () => {
    const expected = undefined;

    expect(validatePerioder(new Date(2020,11,11), new Date(2020,12,12))).toEqual(expected);
  });
});
