import React from 'react';
import EnkelPeriode, {
  formatDate,
  formatPeriod,
  validatePeriod
} from './EnkelPeriode';

describe('EnkelPeriode', () => {
  it('should format a single date correctly', () => {
    expect(formatDate(new Date(2020, 11, 24))).toEqual('24.12.2020');
  });

  it('should format date correctly when undefined', () => {
    expect(formatDate()).toEqual('');
  });

  it('should format a period correctly', () => {
    expect(formatPeriod(new Date(2020, 11, 1), new Date(2020, 11, 24))).toEqual(
      '01.12.2020 til 24.12.2020'
    );
  });

  it('should format a period correctly when no fom', () => {
    expect(formatPeriod(undefined, new Date(2020, 11, 24))).toEqual('');
  });

  it('should format a period correctly when no tom', () => {
    expect(formatPeriod(new Date(2020, 11, 24), undefined)).toEqual('');
  });

  it('should format period correctly when no dates', () => {
    expect(formatPeriod()).toEqual('');
  });

  it('should validate period correctly', () => {
    expect(validatePeriod(new Date(2020, 11, 1))).toEqual('');
  });

  // it('should validate period correctly when fom is undefined', () => {
  //   expect(validatePeriod(undefined, new Date(2020, 11, 24))).toEqual(
  //     'Perioden må ha to gyldige datoer'
  //   );
  // });

  // it('should validate period correctly when tom is undefined', () => {
  //   expect(validatePeriod(new Date(2020, 11, 24), undefined)).toEqual(
  //     'Perioden må ha to gyldige datoer'
  //   );
  // });

  it('should validate period correctly when undefined', () => {
    expect(validatePeriod()).toEqual('Feltet må ha gyldig dato');
  });
});
