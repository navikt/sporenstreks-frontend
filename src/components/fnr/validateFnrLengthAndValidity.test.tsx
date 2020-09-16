import '@testing-library/jest-dom'

import { validateFnrLengthAndValidity } from './validateFnrLengthAndValidity';
import { TestFnr } from './TestFnr';

describe('validateFnrLengthAndValidity', () => {
  it('should validate that everything is OK', () => {
    const input: string = TestFnr.GyldigeFraDolly.TestPerson1;

    const expected = undefined;

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });

  it('should validate that fødselsnummer is missing', () => {
    const expected = 'Fødselsnummer må fylles ut';

    expect(validateFnrLengthAndValidity()).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not more', () => {
    const input: string =  TestFnr.Ugyldige.ForLangt;

    const expected = 'Fødselsnummer må ha 11 siffer';

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not less', () => {
    const input: string = TestFnr.Ugyldige.ForKort;

    const expected = 'Fødselsnummer må ha 11 siffer';

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });

  it('should validate that the fødsesnummer control numbers must not be invalid', () => {
    const input: string = TestFnr.Ugyldige.UgyldigKontrollSiffer;

    const expected = 'Fødselsnummer er ugyldig';

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });
});
