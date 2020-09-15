import React from 'react';
import { PeriodeFormatter } from './PeriodeFormatter';

describe('PeriodeFormatter', () => {

  it('should return undefined', () => {
    expect(PeriodeFormatter()).toBeUndefined();
  })

  it('should format correctly with to dates', () => {
    expect(PeriodeFormatter(
      new Date(2020,5,5,17,25),
      new Date(2021,6,6,18, 5))
    ).toBe('2020-06-05 til 2021-07-06');
  })

  it('should format with only fom', () => {
    expect(PeriodeFormatter(
      new Date(2020,5,5,17,25))
    ).toBe('2020-06-05');
  })

  it('should format without fom', () => {
    expect(PeriodeFormatter(
      undefined,
      new Date(2021,6,6,18, 5))
    ).toBe('2021-07-06');
  })

})
