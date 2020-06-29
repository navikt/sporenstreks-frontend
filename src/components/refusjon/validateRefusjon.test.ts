import validateRefusjon from './validateRefusjon';

describe('validateRefusjon', () => {

  it('should accept positive numbers', () => {
    expect(validateRefusjon(98765)).toBeUndefined();
  })

  it('should not accept high values', () => {
    expect(validateRefusjon(1000001)).toBe('Beløpet er for høyt');
  })

  it('should not accept negative', () => {
    expect(validateRefusjon(-1)).toBe('Beløpet er for lavt');
  })

  it('should accept zero', () => {
    expect(validateRefusjon(0)).toBeUndefined();
  })

  it('should not accept undefined', () => {
    expect(validateRefusjon()).toBe('Beløp må fylles ut');
  })

})
