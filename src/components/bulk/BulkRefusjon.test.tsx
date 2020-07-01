import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { useAppStore } from '../../data/store/AppStore';

import BulkRefusjon from './BulkRefusjon';
import { Ansatt } from '../../data/types/sporenstreksTypes';

const mockAnsatte: Ansatt[] = [
  {
    id: 'ansatt1',
    fnr: '1',
    fom: '2020-02-02',
    tom: '2020-03-03',
    status: 123,
    oppdatert: 1
  },
  {
    id: 1,
    fnr: '1',
    fom: '2020-02-02',
    tom: '2020-03-03',
    status: 123,
    oppdatert: 1,
    dagerError: 'DagerError'
  }
];

jest.mock('../../data/store/AppStore');

describe('BulkRefusjon', () => {
  it('shold display the component', () => {
    const mockUseAppStore = useAppStore as jest.Mock

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: jest.fn()
    });

    render(<BulkRefusjon id="ansatt1" />);

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
  })

  it('shold update the ansatte data', () => {
    const mockUseAppStore = useAppStore as jest.Mock
    const mockSetAnsatte = jest.fn();
    const expected: Ansatt[] = [
      {
        'beloep': 5,
        'beloepError': undefined,
        'fnr': '1',
        'fom': '2020-02-02',
        'id': 'ansatt1',
        'oppdatert': 1,
        'status': 123,
        'tom': '2020-03-03'
      },
      {
        'dagerError': 'DagerError',
        'fnr': '1',
        'fom': '2020-02-02',
        'id': 1,
        'oppdatert': 1,
        'status': 123,
        'tom': '2020-03-03'
      }
    ];

    mockUseAppStore.mockReturnValue({
      ansatte: mockAnsatte,
      setAnsatte: mockSetAnsatte
    });

    render(<BulkRefusjon id="ansatt1" />);
    const inputFelt = screen.getByPlaceholderText('Kroner');

    fireEvent.change(inputFelt, { target: { value: '5' } });

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
    expect(mockSetAnsatte).toHaveBeenCalledWith(expected)
  })

})
