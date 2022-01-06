import validateDagerEnkeltinnsending from './validateDagerEnkeltinnsending';

describe('validateDagerEnkeltinnsending', () => {
  it('should not allow zero', () => {
    expect(validateDagerEnkeltinnsending(0)).toEqual(
      'Dager må være høyere enn 0'
    );
  });

  it('should not accept undefined', () => {
    expect(validateDagerEnkeltinnsending()).toBe('Feltet må fylles ut');
  });

  it('should accept 1-13', () => {
    expect(validateDagerEnkeltinnsending(1)).toBeUndefined();
    expect(validateDagerEnkeltinnsending(13)).toBeUndefined();
  });

  it('should not accept negative', () => {
    expect(validateDagerEnkeltinnsending(-1)).toEqual(
      'Dager må være høyere enn 0'
    );
  });

  it('should not allow to high value', () => {
    expect(validateDagerEnkeltinnsending(14)).toEqual(
      'Dager må være 13 eller lavere'
    );
  });
});
