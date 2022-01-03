import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import EnkelPeriode, {
  formatDate,
  formatPeriod,
  validatePeriod
} from './EnkelPeriode';

jest.mock('react-hook-form', () => ({
  ...(jest.requireActual('react-hook-form') as typeof ReactRouterDom),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    setError: () => jest.fn(),
    clearErrors: () => jest.fn(),
    formState: { errors: {} }
  })
}));

describe('EnkelPeriode', () => {
  it('should format a single date correctly', () => {
    expect(formatDate(new Date(2020, 11, 24))).toEqual('24.12.2020');
  });

  it('should format date correctly when undefined', () => {
    expect(formatDate()).toEqual('');
  });

  it('should format a period correctly', () => {
    expect(formatPeriod(new Date(2020, 11, 1), new Date(2020, 11, 24))).toEqual(
      '01.12.2020 til 24.12.2020'
    );
  });

  it('should format a period correctly when no fom', () => {
    expect(formatPeriod(undefined, new Date(2020, 11, 24))).toEqual('');
  });

  it('should format a period correctly when no tom', () => {
    expect(formatPeriod(new Date(2020, 11, 24), undefined)).toEqual('');
  });

  it('should format period correctly when no dates', () => {
    expect(formatPeriod()).toEqual('');
  });

  it('should validate period correctly', () => {
    expect(validatePeriod(new Date(2020, 11, 1))).toEqual('');
  });

  it('should validate period correctly when undefined', () => {
    expect(validatePeriod()).toEqual('Feltet må ha gyldig dato');
  });

  it('should have no a11y violations', async () => {
    const mockCloseCallback = jest.fn();
    const { container } = render(
      <EnkelPeriode onClose={mockCloseCallback} index={1} />
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
