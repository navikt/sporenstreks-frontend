import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

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

  it('should render an inputfield with the correct id', () => {
    const mockCallback = jest.fn();

    render(<FodselsnummerInput id={12345678} handleChange={mockCallback}/>);

    expect(screen.getByLabelText('Fødselsnummer')).toHaveAttribute('id','fnr_12345678')
  })
})
