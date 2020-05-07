import '@testing-library/jest-dom'

import { validateFnrLengthAndValidity } from './validateFnrLengthAndValidity';

describe('validateFnrLengthAndValidity', () => {
  it('should validate that everything is OK', () => {
    const input: string = "27036405924";

    const expected = undefined;

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });

  it('should validate that fødselsnummer is missing', () => {
    const expected = "Fødselsnummer må fylles ut";

    expect(validateFnrLengthAndValidity()).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not more', () => {
    const input: string =  "270364059200";

    const expected = "Fødselsnummer må ha 11 siffer";

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must be 11 and not less', () => {
    const input: string = "27036405";

    const expected = "Fødselsnummer må ha 11 siffer";

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });

  it('should validate that the fødsesnummer length must not be invalid', () => {
    const input: string = "27036405000";

    const expected = "Fødselsnummer er ugyldig";

    expect(validateFnrLengthAndValidity(input)).toEqual(expected);
  });
});
