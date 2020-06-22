import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { useAppStore } from '../data/store/AppStore';

import Sykepenger from './Sykepenger';

jest.mock('../data/store/AppStore');

const mockUseAppStore = useAppStore as jest.Mock
const mockArbeidsgiverValues = {
  arbeidsgivere: [{
    Name: 'Navn',
    Type: 'Type',
    OrganizationNumber: '123456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  }, {
    Name: 'Navn',
    Type: 'Type',
    OrganizationNumber: '223456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  }, {
    Name: 'Navn3',
    Type: 'Type',
    OrganizationNumber: '323456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  }],
  setReferanseNummer: jest.fn()
};

describe('Sykepenger', () => {
  it('should show warning when arbeidsgiver contains no data', () => {
    mockUseAppStore.mockReturnValue({
      arbeidsgivere: [],
      setReferanseNummer: jest.fn()
    });

    const history = createMemoryHistory();

    const rendered = render(<Router history={history}><Sykepenger /></Router>);

    expect(rendered.getByText('Du har ikke rettigheter til å søke om refusjon for noen bedrifter')).toBeTruthy();
  });

  it('should show infotext when arbeidsgiver has data', () => {
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);

    const history = createMemoryHistory();

    const rendered = render(<Router history={history}><Sykepenger /></Router>);

    expect(rendered.getByText(
      'Hvor mange arbeidsdager gikk tapt?'
    )).toBeInTheDocument();
  });

  it('gives warning on missing fødselsnummer', () => {
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);

    const history = createMemoryHistory();

    const rendered = render(<Router history={history}><Sykepenger /></Router>);

    const inputNode = rendered.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent(inputNode, new FocusEvent('blur'));

    expect(rendered.queryAllByText('Fødselsnummer må fylles ut').length).toBe(2)
  });

  it('gives warning on short fødselsnummer', () => {
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);

    const history = createMemoryHistory();

    const rendered = render(<Router history={history}><Sykepenger /></Router>);

    const inputNode = rendered.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, { target: { value: '11' } });

    fireEvent(inputNode, new FocusEvent('blur'));

    expect(rendered.queryAllByText('Fødselsnummer må ha 11 siffer').length).toBe(2)
  });

  it('gives warning on invalid fødselsnummer', () => {
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);

    const history = createMemoryHistory();

    const rendered = render(<Router history={history}><Sykepenger /></Router>);

    const inputNode = rendered.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, { target: { value: '11111111111' } });

    fireEvent.blur(inputNode);

    expect(rendered.queryAllByText('Fødselsnummer er ugyldig').length).toBe(2)
  });

  it('gives warning on invalid fødselsnummer', () => {
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);

    const history = createMemoryHistory();

    const rendered = render(<Router history={history}><Sykepenger /></Router>);

    const inputNode = rendered.getByLabelText(
      'Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, {
      target: { value: '21112428795' }
    }); // Randomly, at least once, generated fødselsnummer

    fireEvent.blur(inputNode);

    expect(rendered.queryAllByText('Fødselsnummer er ugyldig').length).toBe(0);
  });

  it('should not submit when data is missing, but in stead give error', async () => {

    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);

    const history = createMemoryHistory();

    render(<Router history={history}><Sykepenger /></Router>);

    const erklarerCheck = screen.getByText('Vi erklærer:');

    fireEvent.click(erklarerCheck);

    const submitButton = screen.getByText('Send søknad om refusjon');

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(screen.queryAllByText(/Fødselsnummer må fylles ut/).length).toBe(2);
  });
});
