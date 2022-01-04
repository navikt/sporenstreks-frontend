import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import FodselsnummerInput from './FodselsnummerInput';
import { act } from 'react-dom/test-utils';
import { TestFnr } from './TestFnr';

describe('FodselsnummerInput', () => {
  it('should render the screen', () => {
    render(<FodselsnummerInput handleChange={() => true} />);
    expect(screen.queryAllByText('Fødselsnummer').length).toEqual(1);
  });

  it('should render the screen with error message', () => {
    render(
      <FodselsnummerInput
        feilmelding={'Feilmelding'}
        handleChange={() => true}
      />
    );
    expect(screen.queryAllByText('Fødselsnummer').length).toEqual(1);
    expect(screen.queryAllByText('Feilmelding').length).toEqual(1);
  });

  it('should render the screen with error message', () => {
    const mockCallback = jest.fn();
    render(<FodselsnummerInput handleChange={mockCallback} />);

    const inputField = screen.getByLabelText(/Fødselsnummer/);

    fireEvent.change(inputField, { target: { value: '5' } });
    fireEvent.blur(inputField, { target: { value: '5' } });

    expect(mockCallback).toHaveBeenCalledWith('5');
    expect(screen.getByText('Fødselsnummer')).toBeInTheDocument();
    expect(
      screen.getByText('Fødselsnummer må ha 11 siffer')
    ).toBeInTheDocument();
  });

  it('should render the screen with invalid fødselsnummer', () => {
    const mockCallback = jest.fn();
    render(<FodselsnummerInput handleChange={mockCallback} />);

    const inputField = screen.getByLabelText(/Fødselsnummer/);
    fireEvent.change(inputField, {
      target: { value: TestFnr.Ugyldige.UgyldigKontrollSiffer }
    });
    fireEvent.blur(inputField, {
      target: { value: TestFnr.Ugyldige.UgyldigKontrollSiffer }
    });

    expect(mockCallback).toHaveBeenCalledWith(
      TestFnr.Ugyldige.UgyldigKontrollSiffer
    );
    expect(screen.getByText('Fødselsnummer')).toBeInTheDocument();
    expect(screen.getByText('Fødselsnummer er ugyldig')).toBeInTheDocument();
  });

  it('should render an inputfield with the correct id', () => {
    const mockCallback = jest.fn();

    render(<FodselsnummerInput id={12345678} handleChange={mockCallback} />);

    expect(screen.getByLabelText('Fødselsnummer')).toHaveAttribute(
      'id',
      'fnr_12345678'
    );
  });
});
