import React from 'react';
import { PeriodeConverter } from './PeriodeConverter';

describe('PeriodeConverter', () => {
  it('should return undefined', () => {
    expect(PeriodeConverter()).toBeUndefined();
  });

  it('should return correctly converted date', () => {
    expect(PeriodeConverter(new Date(2020, 5, 5, 17, 25))).toBe('2020-06-05');
  });
});
