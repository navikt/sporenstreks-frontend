import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FodselsnummerInput from './FodselsnummerInput';
import { act } from 'react-dom/test-utils';

describe('FodselsnummerInput', () => {
  it('should render the component', () => {
    const component = render(<FodselsnummerInput handleChange={() => true} />);
    expect(component.queryAllByText('Fødselsnummer').length).toEqual(1);
  })

  it('should render the component with error message', () => {
    const component = render(<FodselsnummerInput feilmelding={'Feilmelding'} handleChange={() => true} />);
    expect(component.queryAllByText('Fødselsnummer').length).toEqual(1);
    expect(component.queryAllByText('Feilmelding').length).toEqual(1);
  })

  it('should render the component with error message', () => {
    const mockCallback = jest.fn();
    const component = render(<FodselsnummerInput handleChange={mockCallback} />);

    const inputField = component.getByLabelText(/Fødselsnummer/);

    fireEvent.change(inputField, { target: { value: "5" } });
    fireEvent.blur(inputField, { target: { value: "5" } });
    expect(mockCallback).toHaveBeenCalledWith("5");

    // const test = component.getByText('Fddødselsnummer');
    expect(component.getByText('Fødselsnummer')).toBeInTheDocument();
    expect(component.getByText('Fødselsnummer må ha 11 siffer')).toBeInTheDocument();
  })

  it('should render the component with invalid fødselsnummer', () => {
    const mockCallback = jest.fn();
    const component = render(<FodselsnummerInput handleChange={mockCallback} />);

    const inputField = component.getByLabelText(/Fødselsnummer/);
    fireEvent.change(inputField, { target: { value: "18060799943" } })
    fireEvent.blur(inputField, { target: { value: "18060799943" } });

    expect(mockCallback).toHaveBeenCalledWith("18060799943");
    expect(component.getByText('Fødselsnummer')).toBeInTheDocument();
    expect(component.getByText('Fødselsnummer er ugyldig')).toBeInTheDocument();
  })


})
