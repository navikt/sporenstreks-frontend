import { filterIdentityNumberInput } from './filterIndentityNumberInput';

describe('filterIdentityNumberInput', () => {
  it('filters non-numbers', () => {
    const input = filterIdentityNumberInput('123foo456bar');
    expect(input).toEqual('123456');
  });

  it('filters excess characters', () => {
    const input = filterIdentityNumberInput('12345678901234');
    expect(input).toEqual('12345678901');
  });

  it('filters non-numbers and excess characters', () => {
    const input = filterIdentityNumberInput('123foo4567bar8901234');
    expect(input).toEqual('12345678901');
  });

  it('filters white space', () => {
    const input = filterIdentityNumberInput(' 1 2 3 ');
    expect(input).toEqual('123');
  });

  it('filters special characters', () => {
    const input = filterIdentityNumberInput('!"1#$%&/2()=?`^@3+<>');
    expect(input).toEqual('123');
  });
});
