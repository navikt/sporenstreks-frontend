import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { useAppStore } from "../../data/store/AppStore";

import Refusjon from './Refusjon';
import { Ansatt } from '../../data/types/sporenstreksTypes';

const mockAnsatte: Ansatt[] = [
  {
    id: "ansatt1",
    fnr: "1",
    fom: "2020-02-02",
    tom: "2020-03-03",
    status: 123,
    oppdatert: 1
  },
  {
    id: 1,
    fnr: "1",
    fom: "2020-02-02",
    tom: "2020-03-03",
    status: 123,
    oppdatert: 1,
    dagerError: "DagerError"
  }
];

jest.mock('../../data/store/AppStore');

describe('Refusjon', () => {
  it('shold display the component', () => {
    const mockUseAppStore = useAppStore as jest.Mock

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: jest.fn()
    });

    render(<Refusjon id="ansatt1" />);

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
  })

  it('shold update the ansatte data', () => {
    const mockUseAppStore = useAppStore as jest.Mock
    const mockSetAnsatte = jest.fn();
    const expected: Ansatt[] = [
      {
        "beloep": 5,
        "beloepError": undefined,
        "fnr": "1",
        "fom": "2020-02-02",
        "id": "ansatt1",
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      },
      {
        "dagerError": "DagerError",
        "fnr": "1",
        "fom": "2020-02-02",
        "id": 1,
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      }
    ];

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: mockSetAnsatte
    });

    render(<Refusjon id="ansatt1" />);

    const inputFelt = screen.getByRole('textbox');

    fireEvent.change(inputFelt, { target: { value: "5" } });

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
    expect(mockSetAnsatte).toHaveBeenCalledWith(expected)
  })

  it('shold update the ansatte data with the latest valid data', () => {
    const mockUseAppStore = useAppStore as jest.Mock
    const mockSetAnsatte = jest.fn();
    const expected: Ansatt[] = [
      {
        "beloep": 5,
        "beloepError": undefined,
        "fnr": "1",
        "fom": "2020-02-02",
        "id": "ansatt1",
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      },
      {
        "dagerError": "DagerError",
        "fnr": "1",
        "fom": "2020-02-02",
        "id": 1,
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      }
    ];

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: mockSetAnsatte
    });

    render(<Refusjon id="ansatt1" />);

    const inputFelt = screen.getByRole('textbox');

    fireEvent.change(inputFelt, { target: { value: "5" } });

    fireEvent.change(inputFelt, { target: { value: "7kroner" } });

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
    expect(mockSetAnsatte).toHaveBeenCalledWith(expected)
  })

  it('shold update the ansatte data with formated 1000s', () => {
    const mockUseAppStore = useAppStore as jest.Mock
    const mockSetAnsatte = jest.fn();
    const expected: Ansatt[] = [
      {
        "beloep": 34567,
        "beloepError": undefined,
        "fnr": "1",
        "fom": "2020-02-02",
        "id": "ansatt1",
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      },
      {
        "dagerError": "DagerError",
        "fnr": "1",
        "fom": "2020-02-02",
        "id": 1,
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      }
    ];

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: mockSetAnsatte
    });

    render(<Refusjon id="ansatt1" />);

    const inputFelt = screen.getByRole('textbox');

    fireEvent.change(inputFelt, { target: { value: "34 567" } });

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
    expect(mockSetAnsatte).toHaveBeenCalledWith(expected)
  })

  it('shold just return the list of ansatte if we try to update a non existing ansatt', () => {
    const mockUseAppStore = useAppStore as jest.Mock
    const mockSetAnsatte = jest.fn();
    const expected: Ansatt[] = [
      {
        "beloep": 5,
        "beloepError": undefined,
        "fnr": "1",
        "fom": "2020-02-02",
        "id": "ansatt1",
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      },
      {
        "dagerError": "DagerError",
        "fnr": "1",
        "fom": "2020-02-02",
        "id": 1,
        "oppdatert": 1,
        "status": 123,
        "tom": "2020-03-03"
      }
    ];

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: mockSetAnsatte
    });

    render(<Refusjon id="ansatt007" />);

    const inputFelt = screen.getByRole('textbox');

    fireEvent.change(inputFelt, { target: { value: "5" } });

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
    expect(mockSetAnsatte).toHaveBeenCalledWith(mockAnsatte)
  })

})
