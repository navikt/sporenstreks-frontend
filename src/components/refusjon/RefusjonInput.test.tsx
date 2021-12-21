import { RefusjonInput } from './RefusjonInput';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

const mockLabel = <span>label</span>;

describe('RefusjonInput', () => {
  it('should display error', () => {
    render(
      <RefusjonInput
        feilmelding='DummyFeilmelding'
        handleChange={{}}
        label={mockLabel}
      />
    );
    expect(screen.getByText(/DummyFeilmelding/)).toBeInTheDocument();
  });

  it('should not display error', () => {
    render(<RefusjonInput handleChange={{}} label={mockLabel} />);
    expect(screen.queryByText(/DummyFeilmelding/)).not.toBeInTheDocument;
  });

  it('should display initial value. English format because of lacking support in node...', () => {
    render(<RefusjonInput beloep={1233} handleChange={{}} label={mockLabel} />);
    expect(screen.queryByPlaceholderText('Kroner')?.getAttribute('value')).toBe(
      '1233'
    );
  });

  it('should display empty when initial value not set', () => {
    render(<RefusjonInput handleChange={{}} label={mockLabel} />);
    expect(screen.queryByPlaceholderText('Kroner')?.getAttribute('value')).toBe(
      ''
    );
  });

  it.skip('should not alove , to be entered', () => {
    const changeFunction = jest.fn();
    render(<RefusjonInput handleChange={changeFunction} label={mockLabel} />);

    const inputField = screen.getByPlaceholderText('Kroner');

    userEvent.type(inputField, '101,1{esc}');

    expect(inputField).toHaveValue('1011');

    expect(changeFunction).toHaveBeenLastCalledWith(1011);
  });
});
