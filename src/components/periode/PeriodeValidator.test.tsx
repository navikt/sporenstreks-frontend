import React from 'react';
import { Maximum, Feilmelding, isValidFom, isValidTom } from './PeriodeValidator';
import dayjs from 'dayjs';

describe('PeriodeValidator', () => {

  it('should return maximum date - one year from now', () => {
    expect(Maximum(new Date(2020,5,5,0,0)).getTime()).toBe(new Date(2021,5,5,0,0).getTime());
  })

  it('should validate fom', () => {
    expect(isValidFom(new Date(2020,5,5,17,25))).toBe(true);
    expect(isValidFom(new Date(2020,1,1,17,25))).toBe(true);
    expect(isValidFom()).toBe(false);
  })

  it('should validate tom', () => {
    expect(isValidTom(new Date(2020,5,5,17,25))).toBe(true);
    expect(isValidTom(dayjs(new Date()).add(1, 'year').toDate())).toBe(false);
    expect(isValidTom()).toBe(false);
  })
})

describe('Feilmelding', () => {

  it('should not return feilmleding when fom and tom is given', () => {
    expect(Feilmelding(false, new Date(), new Date())).toBe(undefined);
  })

  it('should not return feilmelding when not required', () => {
    expect(Feilmelding(false, undefined, undefined)).toBe(undefined);
  })

  it('should return feilmelding when required', () => {
    expect(Feilmelding(true, undefined, undefined)).toBe('Må fylles ut');
  })

  it('should return undefined when not required', () => {
    expect(Feilmelding(false, undefined, undefined)).toBe(undefined);
  })

  it('should return feilmelding when fom is required', () => {
    expect(Feilmelding(false, undefined, new Date())).toBe('Velg fom dato');
  })

  it('skal returnere feilmelding hvor tom er påkrevet', () => {
    expect(Feilmelding(false, new Date(), undefined)).toBe('Velg tom dato');
  })
})
