import validateDager from './validateDager';

describe('validateDager', () => {

  it('should allow zero', () => {
    expect(validateDager(0)).toBeUndefined();
  });

  it('should not accept undefined', () => {
    expect(validateDager()).toBe('Feltet må fylles ut');
  });

  it('should accept 1-13', () => {
    expect(validateDager(1)).toBeUndefined();
    expect(validateDager(13)).toBeUndefined();
  });

  it('should not accept negative', () => {
    expect(validateDager(-1)).toEqual('Dager må være 0 eller høyere');
  });

  it('should not allow to high value', () => {
    expect(validateDager(14)).toEqual('Dager må være 13 eller lavere');
  });
});
