import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import BulkDager from './BulkDager';
import { BulkProvider } from '../../context/BulkContext';
import { Ansatt } from './Ansatt';

const mockAnsatte: Ansatt[] = [
  {
    id: 0,
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

describe('BulkDager', () => {
  it('should display the component with a warning', () => {
    const component = render(
      <BulkProvider ansatte={mockAnsatte}>
        <BulkDager id={1} startdato={new Date()} />
      </BulkProvider>
    );
    expect(component.queryAllByText('DagerError').length).toEqual(1);
  });

  it('should display the component without a warning', () => {
    const component = render(
      <BulkProvider>
        <BulkDager id={0} />
      </BulkProvider>
    );
    expect(component.queryAllByText('DagerError').length).toEqual(0);
  });

  it('should update ansatte when a seletion is made', () => {
    const component = render(
      <BulkProvider ansatte={mockAnsatte}>
        <BulkDager id={0} />
      </BulkProvider>
    );
    const expected = [
      {
        antallDagerMedRefusjon: 5,
        dagerError: undefined,
        fnr: '1',
        fom: '2020-02-02',
        id: 0,
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

    const selectBox = component.getByRole('combobox');

    fireEvent.change(selectBox, { target: { value: '5' } });
    expect(mockAnsatte).toEqual(expected);
  });
});
