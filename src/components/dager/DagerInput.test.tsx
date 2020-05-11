import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Ansatt } from '../../data/types/sporenstreksTypes';
import * as appStore from '../../data/store/AppStore';
import { DagerInput } from './DagerInput';


const mockSettAnsatte = jest.fn();
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

jest.spyOn(appStore, 'useAppStore').mockReturnValue({
  unleash: jest.fn(),
  ansatte: mockAnsatte,
  setAnsatte: mockSettAnsatte
});

describe('Dager', () => {
  it('should render the component', () => {
    const component = render(<DagerInput id={0} />);
    expect(component.queryAllByText('Antall dager').length).toEqual(1);
  });

  it('should render the component with error message', () => {
    const component = render(<DagerInput id={1} />);
    expect(component.queryAllByText('Antall dager').length).toEqual(1);
    expect(component.queryAllByText('DagerError').length).toEqual(1);
  });

  it('should update ansatte when a seletion is made', () => {
    const component = render(<DagerInput id={0} />);
    const expected = [
      {
        'antallDagerMedRefusjon': 5,
        'fnr': '1',
        'fom': '2020-02-02',
        'id': 0, 'oppdatert': 1,
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

    const selectBox = component.getByRole('combobox');

    fireEvent.change(selectBox, { target: { value: '5' } });
    expect(mockSettAnsatte).toHaveBeenCalledWith(expected);
  });
});

