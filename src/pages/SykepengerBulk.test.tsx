import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { useAppStore } from '../data/store/AppStore';
import ExcelOpplasting from './ExcelOpplasting';
import userEvent from '@testing-library/user-event';
import KvitteringBulk from './KvitteringBulk';

jest.mock('../data/store/AppStore');

const mockArbeidsgiverValues = {
  arbeidsgivere: [{
    Name: 'Navn',
    Type: 'Type',
    OrganizationNumber: '123456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  }, {
    Name: 'Navn2',
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

const response200 = 'Søknaden er mottatt.'

const response422 = {
  // feil json
}

describe('BulkOpplasting', () => {
  let mockUseAppStore;

  beforeEach(() => {
    mockUseAppStore = useAppStore as jest.Mock;
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('skal vise link til Enkel skjema', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    expect(view.getByText('skal du bruke et eget skjema')).toHaveAttribute('href', '/enkel')
  });

  it('skal vise link til Excel skjema', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    expect(view.getByText('benyttes Excel-opplasting')).toHaveAttribute('href', '/excel')
  });

  it('skal vise link til MinSideArbeidsgiver', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    expect(view.getByText('<< Min side arbeidsgiver')).toHaveAttribute('href', '/min-side-arbeidsgiver/')
  })

  it('skal kunne legge til rad', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    // expect ansatte rad = 1
    userEvent.click(view.getByText('+ Legg til enda en ansatt'))
    // expect ansatte rad = 2
  })

  it('skal ikke kunne slette siste rad', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    // expect ansatte rad = 1
    expect(view.getByText('Slett')).toBeEmpty()
  })

  it('skal kunne slette hvis mere end 1 rad', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    // expect ansatte rad = 2
    userEvent.click(view.getByText('Slett'))
    // expect ansatte rad = 1
  })

  it('skal ikke være mulig å legge til mer enn 50 rader', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    // expect ansatte rad = 49
    userEvent.click(view.getByText('+ Legg til enda en ansatt'))
    // expect ansatte rad = 50
    expect(view.getByText('+ Legg til enda en ansatt')).toBeEmpty()
  })

  it('skal ikke kunne trykke HovedKnapp før Erklaring er akseptert', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

        expect(view.getByRole('button', { name: 'Send søknad om refusjon' })).toBeDisabled();
        userEvent.click(view.getByRole('checkbox'));
        expect(view.getByRole('button', { name: 'Send søknad om refusjon' })).toBeEnabled();
  })

  it('skal ikke kunne trykke HovedKnapp når feilmeldinger vises', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    // expect feil to exist
    expect(view.getByRole('button', { name: 'Send søknad om refusjon' })).toBeDisabled();
  })

  it('skal håndtere timeout ved innsending', () => {

  })

  it('skal håndtere error ved innsending', () => {

  })

  it('skal håndtere valideringsfeil ved innsending', () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    userEvent.click(view.getByRole('checkbox'));
    userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

    const jsonPromise = Promise.resolve(response200)
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 422,
        blob: () => jsonPromise
      })
    );
    await act(() => jsonPromise)
    expect(screen.getByText('Søknaden er mottatt.'))
  })

  it('skal vise kvitteringsside ved gyldig innsending', async () => {
    const view = render(
      <MemoryRouter initialEntries={['/bulk']}>
        <Route path='/bulk'><ExcelOpplasting/></Route> { /* TODO: Skift til bulk komponent */ }
        <Route path='/kvitteringBulk'><KvitteringBulk/></Route>
      </MemoryRouter>);

    userEvent.click(view.getByRole('checkbox'));
    userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

    const jsonPromise = Promise.resolve(response200)
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        blob: () => jsonPromise
      })
    );
    await act(() => jsonPromise)

    // expect feil beskjeder
  })
});

