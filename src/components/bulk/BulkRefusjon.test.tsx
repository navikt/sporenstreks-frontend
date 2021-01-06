import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BulkRefusjon from './BulkRefusjon';
import { BulkProvider } from '../../context/BulkContext';
import { Ansatt } from './Ansatt';

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

describe('BulkRefusjon', () => {
  it('shold display the component', () => {
    render(
      <BulkProvider ansatte={mockAnsatte}>
        <BulkRefusjon id='ansatt1' />
      </BulkProvider>
    );

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
  });

  it('shold update the ansatte data', () => {
    const expected: Ansatt[] = [
      {
        beloep: 5,
        beloepError: undefined,
        fnr: '1',
        fom: '2020-02-02',
        id: 'ansatt1',
        oppdatert: 1,
        status: 123,
        tom: '2020-03-03'
      },
      {
        dagerError: 'DagerError',
        fnr: '1',
        fom: '2020-02-02',
        id: 1,
        oppdatert: 1,
        status: 123,
        tom: '2020-03-03'
      }
    ];

    render(
      <BulkProvider ansatte={mockAnsatte}>
        <BulkRefusjon id='ansatt1' />
      </BulkProvider>
    );
    const inputFelt = screen.getByPlaceholderText('Kroner');

    fireEvent.change(inputFelt, { target: { value: '5' } });

    expect(screen.getByText(/Beløp/)).toBeInTheDocument();
    expect(mockAnsatte).toEqual(expected);
  });
});
