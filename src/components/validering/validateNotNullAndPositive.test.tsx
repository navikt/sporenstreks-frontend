import '@testing-library/jest-dom'
import { validateNotNullAndPositive } from './validateNotNullAndPositive';

describe('validateNotNullAndPositive', () => {
  it('should return undefined when we have a positive number', () => {
    const input: number = Math.ceil(Math.random()*1000);
    const expected = undefined;

    expect(validateNotNullAndPositive(input)).toEqual(expected);
  });

  it('should return "Antall må være positivt" when we have zero as number', () => {
    const input: number = 0;
    const expected = 'Antall må være positivt';

    expect(validateNotNullAndPositive(input)).toEqual(expected);
  });

  it('should check that it is filled out', () => {
    const input = undefined;

    const expected = 'Feltet må fylles ut';

    expect(validateNotNullAndPositive(input)).toEqual(expected);
  });

  it('should return "Antall må være positivt" on negative number', () => {
    const input: number = Math.floor(Math.random()*-1000);
    const expected = 'Antall må være positivt';

    expect(validateNotNullAndPositive(input)).toEqual(expected);
  });
});
