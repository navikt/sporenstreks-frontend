import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ExcelOpplasting from './ExcelOpplasting';
import userEvent from '@testing-library/user-event';
import KvitteringExcel from './KvitteringExcel';
import { Status } from '../api/ArbeidsgiverAPI';
import { ArbeidsgiverProvider } from '../context/ArbeidsgiverContext';
import AppStoreProvider from '../context/AppStoreContext';

const mockArbeidsgiverValues = [
  {
    Name: 'Navn',
    Type: 'Type',
    OrganizationNumber: '123456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  },
  {
    Name: 'Navn',
    Type: 'Type',
    OrganizationNumber: '223456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  },
  {
    Name: 'Navn3',
    Type: 'Type',
    OrganizationNumber: '323456789',
    OrganizationForm: 'oform',
    Status: 'Status',
    ParentOrganizationNumber: '3333344444'
  }
];

const response200 = 'Søknaden er mottatt.';

const response422 = {
  problemDetails: [
    {
      message:
        'EnkelDager refusjonsdager kan ikke være flere enn dagene i perioden',
      row: '1',
      column: 'Arbeidsgiverperioden (fom+tom)'
    },
    {
      message: 'Du har ikke korrekte tilganger for denne virksomheten',
      row: '2',
      column: 'Virksomhetsnummer'
    },
    {
      message: 'Feil ved lesing av tall. Påse at formatet er riktig.',
      row: '3',
      column: 'Beløp'
    },
    {
      message: 'Ugyldig virksomhetsnummer',
      row: '4',
      column: 'Virksomhetsnummer'
    }
  ],
  message: 'En eller flere rader/kolonner har feil.',
  type: 'urn:sporenstreks:excel-error',
  title: 'Det var en eller flere feil med excelarket',
  status: 422,
  detail: 'En eller flere rader/kolonner har feil.',
  instance: 'about:blank'
};

const mockFile = new File(['(⌐□_□)'], 'fil.xlsx', {
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
});

describe('ExcelOpplasting', () => {
  it('uploads file and redirects to kvittering when file is valid', async () => {
    const jsonPromise = Promise.resolve(response200);

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        blob: () => jsonPromise
      })
    );

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/excel']}>
            <Route path='/excel'>
              <ExcelOpplasting />
            </Route>
            <Route path='/excel/kvittering'>
              <KvitteringExcel />
            </Route>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const uploadButton = screen.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile);

    expect(screen.getByLabelText(/fil.xlsx/)).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox'));

    // bruker får sendt inn skjema når erklæring er avhuket
    expect(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    ).toBeEnabled();

    userEvent.click(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    );

    await waitFor(() => jsonPromise);

    // bruker blir sendt til kvitteringside
    expect(screen.getByText('Søknaden er mottatt.')).toBeInTheDocument();
  });

  it('displays errors when uploaded file is not accepted', async () => {
    const jsonPromise = Promise.resolve(response422);

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 422,
        json: () => jsonPromise
      })
    );

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    const uploadButton = screen.getByLabelText(/Last opp utfylt Excel-mal/);
    userEvent.upload(uploadButton, mockFile);

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText('fil.xlsx')).toBeInTheDocument();

    // bruker får sendt inn skjema når erklæring er avhuket
    userEvent.click(screen.getByRole('checkbox'));

    expect(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    ).toBeEnabled();

    userEvent.click(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    );

    await waitFor(() => jsonPromise);

    // bruker får feilmeldinger
    expect(
      screen.getByText(
        'Følgende feil i dokumentet må utbedres før du laster det opp på nytt:'
      )
    ).toBeInTheDocument();
  });

  it('displays expired token modal when given a 401', async () => {
    const jsonPromise = Promise.resolve({});

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        json: () => jsonPromise
      })
    );

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    const uploadButton = screen.getByLabelText(/Last opp utfylt Excel-mal/);
    userEvent.upload(uploadButton, mockFile);

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText('fil.xlsx')).toBeInTheDocument();

    // bruker får sendt inn skjema når erklæring er avhuket
    userEvent.click(screen.getByRole('checkbox'));

    expect(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    ).toBeEnabled();

    userEvent.click(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    );

    await waitFor(() => jsonPromise);

    expect(
      screen.getByText(
        'Du har blitt logget ut. Vennligst prøv på nytt etter innlogging.'
      )
    ).toBeInTheDocument();
  });

  it('disables submit when Erklæring is unchecked', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    const uploadButton = screen.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile);

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText(/fil.xlsx/)).toBeInTheDocument();

    userEvent.click(
      screen.getByRole('button', { name: 'Send søknad om refusjon' })
    );

    //klikk på submit-knapp viser feilmelding om å huke av erklæring
    expect(
      screen.getByText('Du må huke av erklæringen før du kan sende inn')
    ).toBeInTheDocument();
  });

  it('does not accept file upload over 250kB', () => {
    const mockBigFile = {
      size: 260000,
      fileName: 'tooLarge.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File;

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    const uploadButton = screen.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockBigFile);

    //opplastingsknappen får samme navn som fil hvis den er lastet opp
    expect(screen.queryByText('fil.xlsx')).not.toBeInTheDocument();

    //feilmeldinger skal vises dersom opplasting gikk galt

    expect(
      screen.getByText(
        /Følgende feil i dokumentet må utbedres før du laster det opp på nytt/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Du kan ikke laste opp filer større enn 250 kB.')
    ).toBeInTheDocument();
  });

  it('show links to the other forms', async () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      screen.getByRole('link', { name: 'skal du bruke et eget skjema' })
    ).toHaveAttribute('href', '/enkel/');
    expect(
      screen.getByRole('link', {
        name: 'eget skjema for å søke om refusjonskrav for flere ansatte'
      })
    ).toHaveAttribute('href', '/bulk/');
  });

  it('show download link for template bulk krav', async () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      screen.getByRole('link', {
        name: 'Last ned malen for nye refusjonskrav her,'
      })
    ).toHaveAttribute('href', 'http://localhost:8080/api/v1/bulk/template');
  });

  it('show download link for template tariff oppdatering av krav', async () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter>
            <ExcelOpplasting />
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      // @ts-ignore
      screen.getByRole('link', {
        name: 'endring av tidligere innsendt krav brukes denne malen.'
      })
    ).toHaveAttribute(
      'href',
      'http://localhost:8080/api/v1/bulk/tariff-template'
    );
  });
});
