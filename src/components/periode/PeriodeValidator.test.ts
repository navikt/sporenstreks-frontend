import {
  Feilmelding,
  finalMaxDate,
  isValidFom,
  isValidTom
} from './PeriodeValidator';
import dayjs from 'dayjs';
import timezone_mock from 'timezone-mock';

describe('PeriodeValidator', () => {
  beforeAll(() => {
    timezone_mock.register('UTC');
  });

  afterAll(() => {
    timezone_mock.unregister();
  });

  it('should validate fom', () => {
    expect(isValidFom(new Date(2020, 5, 5, 17, 25))).toBe(true);
    expect(isValidFom(new Date(2020, 1, 1, 17, 25))).toBe(true);
    expect(isValidFom()).toBe(false);
  });

  it('should validate tom', () => {
    expect(isValidTom(new Date(2020, 5, 5, 17, 25))).toBe(true);
    expect(isValidTom(dayjs(new Date()).add(1, 'year').toDate())).toBe(false);
    expect(isValidTom()).toBe(false);
  });

  it('should return the final date', () => {
    expect(finalMaxDate(new Date(2022, 8, 5, 17, 25))).toStrictEqual(
      new Date('2022-06-30T00:00:00.000Z')
    );
  });
});

describe('Feilmelding', () => {
  it('should not return feilmleding when fom and tom is given', () => {
    expect(Feilmelding(false, new Date(), new Date())).toBe(undefined);
  });

  it('should not return feilmelding when not required', () => {
    expect(Feilmelding(false)).toBe(undefined);
  });

  it('should return feilmelding when required', () => {
    expect(Feilmelding(true, undefined, undefined)).toBe('Må fylles ut');
  });

  it('should return undefined when not required', () => {
    expect(Feilmelding(false, undefined, undefined)).toBe(undefined);
  });

  it('should return feilmelding when fom is required', () => {
    expect(Feilmelding(false, undefined, new Date())).toBe('Velg fom dato');
  });

  it('skal returnere feilmelding hvor tom er påkrevet', () => {
    expect(Feilmelding(false, new Date(), undefined)).toBe('Velg tom dato');
  });
});
