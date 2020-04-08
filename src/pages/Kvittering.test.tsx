import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { useAppStore } from '../data/store/AppStore';
import Kvittering from './Kvittering';

jest.mock('../data/store/AppStore');

const mockUseAppStore = useAppStore as jest.Mock
const history = createMemoryHistory();

describe('Kvittering', () => {
  it("should render the component and display a warning text", () => {
    mockUseAppStore.mockReturnValue({
      referanseNummer: '1234'
  });
    const rendered = render(<Router history={history}><Kvittering /></Router>);

    expect(rendered.queryAllByText(/Referansenummer/).length).toBe(1);
    expect(rendered.queryAllByText(/1234/).length).toBe(1);
  })
});
