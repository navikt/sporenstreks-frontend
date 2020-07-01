import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { useAppStore } from '../data/store/AppStore';
import ExcelOpplasting from './ExcelOpplasting';
import userEvent from '@testing-library/user-event';
import KvitteringExcel from './KvitteringExcel';

jest.mock('../data/store/AppStore');
const mockArbeidsgiverValues =
  [{
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
  }];

const response200 = 'Søknaden er mottatt.'

const response422 = {
  'problemDetails': [{
    'message': 'EnkelDager refusjonsdager kan ikke være flere enn dagene i perioden',
    'row': '1',
    'column': 'Arbeidsgiverperioden (fom+tom)'
  }, {
    'message': 'Du har ikke korrekte tilganger for denne virksomheten',
    'row': '2',
    'column': 'Virksomhetsnummer'
  }, {
    'message': 'Feil ved lesing av tall. Påse at formatet er riktig.',
    'row': '3',
    'column': 'Beløp'
  }, {
    'message': 'Ugyldig virksomhetsnummer',
    'row': '4',
    'column': 'Virksomhetsnummer'
  }],
  'message': 'En eller flere rader/kolonner har feil.',
  'type': 'urn:sporenstreks:excel-error',
  'title': 'Det var en eller flere feil med excelarket',
  'status': 422,
  'detail': 'En eller flere rader/kolonner har feil.',
  'instance': 'about:blank'
}

const mockFile = new File(['(⌐□_□)'], 'fil.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

const setTokenExpired = jest.fn();

describe('ExcelOpplasting', () => {
  let mockUseAppStore;

  beforeEach(() => {
    mockUseAppStore = useAppStore as jest.Mock;
    mockUseAppStore.mockReturnValue({
      arbeidsgivere: mockArbeidsgiverValues,
      setTokenExpired: setTokenExpired,
      tokenExpired: false
    });

  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uploads file and redirects to kvittering when file is valid', async () => {

      const jsonPromise = Promise.resolve(response200)

      // @ts-ignore
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          blob: () => jsonPromise
        })
      );

    const view = render(
        <MemoryRouter initialEntries={['/excel']}>
          <Route path='/excel'><ExcelOpplasting/></Route>
          <Route path='/kvitteringExcel'><KvitteringExcel/></Route>
        </MemoryRouter>);

      const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

      userEvent.upload(uploadButton, mockFile)

      expect(screen.getByLabelText(/fil.xlsx/)).toBeInTheDocument();

      userEvent.click(view.getByRole('checkbox'));

      // bruker får sendt inn skjema når erklæring er avhuket
      expect(screen.getByRole('button', { name: 'Send søknad om refusjon' })).toBeEnabled();

      userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

      // @ts-ignore
      await act(() => jsonPromise)

      // bruker blir sendt til kvitteringside
      expect(screen.getByText('Søknaden er mottatt.'))

    }
  )

  it('displays errors when uploaded file is not accepted', async () => {

    const jsonPromise = Promise.resolve(response422)

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 422,
        json: () => jsonPromise
      })
    );

    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);
    userEvent.upload(uploadButton, mockFile)

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText('fil.xlsx')).toBeInTheDocument();

    // bruker får sendt inn skjema når erklæring er avhuket
    userEvent.click(view.getByRole('checkbox'));

    expect(screen.getByRole('button', { name: 'Send søknad om refusjon' })).toBeEnabled();

    userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

    // @ts-ignore
    await act(() => jsonPromise)

    // bruker får feilmeldinger
    expect(screen.getByText('Følgende feil i dokumentet må utbedres før du laster det opp på nytt:')).toBeInTheDocument();
  })

  it('displays expired token modal when given a 401', async () => {

    const jsonPromise = Promise.resolve({})

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        json: () => jsonPromise
      })
    );

    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);
    userEvent.upload(uploadButton, mockFile)

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText('fil.xlsx')).toBeInTheDocument();

    // bruker får sendt inn skjema når erklæring er avhuket
    userEvent.click(view.getByRole('checkbox'));

    expect(screen.getByRole('button', { name: 'Send søknad om refusjon' })).toBeEnabled();

    userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

    // @ts-ignore
    await act(() => jsonPromise)

    expect(setTokenExpired).toHaveBeenCalledTimes(2);
    expect(setTokenExpired).toHaveBeenLastCalledWith(true);
    expect(screen.getByText('Du har blitt logget ut. Vennligst prøv på nytt etter innlogging.')).toBeInTheDocument();
  })

  it('disables submit when Erklæring is unchecked', () => {
    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile)

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText(/fil.xlsx/)).toBeInTheDocument();



    userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

    //klikk på submit-knapp viser feilmelding om å huke av erklæring
    expect(screen.getByText('Du må huke av erklæringen før du kan sende inn')).toBeInTheDocument();

  })

  it('does not accept file upload over 250kB', () => {
    const mockFile = {
      size: 260000,
      fileName: 'tooLarge.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File

    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile);

    //opplastingsknappen får samme navn som fil hvis den er lastet opp
    expect(view.queryByText('fil.xlsx')).not.toBeInTheDocument();

    //feilmeldinger skal vises dersom opplasting gikk galt

    expect(view.getByText(/Følgende feil i dokumentet må utbedres før du laster det opp på nytt/)).toBeInTheDocument();
    expect(view.getByText('Du kan ikke laste opp filer større enn 250 kB.')).toBeInTheDocument();
  })
});

