import { RefusjonInput } from './RefusjonInput';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

const mockLabel = <span>label</span>;

describe('RefusjonInput', () => {
  it('should display error', () => {
    const rendered = render(
      <RefusjonInput
        feilmelding='DummyFeilmelding'
        handleChange={{}}
        label={mockLabel}
      />
    );
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeTruthy();
  });

  it('should not display error', () => {
    const rendered = render(
      <RefusjonInput handleChange={{}} label={mockLabel} />
    );
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeFalsy;
  });

  it('should display initial value. English format because of lacking support in node...', () => {
    const rendered = render(
      <RefusjonInput beloep={1233} handleChange={{}} label={mockLabel} />
    );
    expect(
      rendered.queryByPlaceholderText('Kroner')?.getAttribute('value')
    ).toBe('1233');
  });

  it('should display empty when initial value not set', () => {
    const rendered = render(
      <RefusjonInput handleChange={{}} label={mockLabel} />
    );
    expect(
      rendered.queryByPlaceholderText('Kroner')?.getAttribute('value')
    ).toBe('');
  });

  it.skip('should not alove , to be entered', async () => {
    const changeFunction = jest.fn();
    render(<RefusjonInput handleChange={changeFunction} label={mockLabel} />);

    const inputField = screen.getByPlaceholderText('Kroner');

    await userEvent.type(inputField, '101,1{esc}', { delay: 10 });

    expect(inputField).toHaveValue('1011');

    expect(changeFunction).toHaveBeenLastCalledWith(1011);
  });
});
