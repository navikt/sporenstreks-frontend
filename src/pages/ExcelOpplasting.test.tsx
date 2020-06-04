import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import { useAppStore } from '../data/store/AppStore';
import ExcelOpplasting from './ExcelOpplasting';
import userEvent from '@testing-library/user-event';
import InnsendingExcelFil from '../components/InnsendingExcelFil';
import { tabellFeil } from '../components/feilvisning/FeilTabell';
import Sykepenger from './Sykepenger';
import { createMemoryHistory } from 'history';
import 'mutationobserver-shim';

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

const mockServer = 'http://mockserver.nav.no';


describe('KvitteringExcel', () => {
  let mockUseAppStore;

  beforeEach(() => {
    mockUseAppStore = useAppStore as jest.Mock;
    mockUseAppStore.mockReturnValue(mockArbeidsgiverValues);
    window.MutationObserver = MutationObserver;

  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uploads file and redirects to kvittering when file is valid', () => {

    jest.mock('../components/InnsendingExcelFil.ts', () => {
      return new Promise((resolve, reject) => {
        resolve([{ indeks: -1, melding: 'Noe gikk galt' }])

      })
    });

      const mockHistoryPush = jest.fn();

      const mockFile = new File(['(⌐□_□)'], 'fil.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      jest.mock('react-router-dom', () => ({
        // @ts-ignore
        ...jest.requireActual('react-router-dom'),
        useHistory: () => ({
          push: mockHistoryPush,
        }),
      }));

    global.MutationObserver = window.MutationObserver;
    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
      const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

      userEvent.upload(uploadButton, mockFile)

      // bruker får lastet opp .xlsx-fil
      expect(screen.getByLabelText(/fil.xlsx/)).toBeInTheDocument();

      // bruker får sendt inn skjema når erklæring er avhuket
      userEvent.click(view.getByRole('checkbox'));

      expect(screen.getByRole('button', { name: 'Send søknad om refusjon' })).toBeEnabled();

      userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

      // bruker blir sendt til kvitteringside

      expect(mockHistoryPush).toBeCalledWith('/kvitteringExcel');

      //TODO: få den til å svare sånn som jeg vil


    }
  )

  it('displays errors when uploaded file is not accepted', async () => {


    const errors = [{ indeks: -1, melding: 'Noe har gått skikkelig galt' }]

    jest.mock('../components/InnsendingExcelFil.ts');

    const mockFile = new File(['(⌐□_□)'], 'errorfil.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    global.MutationObserver = window.MutationObserver;
    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile)

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText('errorfil.xlsx')).toBeInTheDocument();

    // bruker får sendt inn skjema når erklæring er avhuket
    userEvent.click(view.getByRole('checkbox'));

    expect(screen.getByRole('button', { name: 'Send søknad om refusjon' })).toBeEnabled();

    userEvent.click(screen.getByRole('button', { name: 'Send søknad om refusjon' }));

    await waitFor(() => {})
    expect(screen.getByText('Følgende feil i dokumentet må utbedres')).toBeInTheDocument();

    // bruker får feilmeldinger
    expect(screen.getByText('Følgende feil i dokumentet må utbedres')).toBeInTheDocument();

    //TODO: få den til å svare sånn som jeg vil

  })

  it('disables submit when Erklæring is unchecked', () => {
    const mockFile = new File(['(⌐□_□)'], 'fil.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    global.MutationObserver = window.MutationObserver;
    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile)

    // bruker får lastet opp .xlsx-fil
    expect(screen.getByLabelText(/fil.xlsx/)).toBeInTheDocument();

    //submit-knapp er disablet selv om fil er lastet opp

    expect(screen.getByRole('button', { name: 'Send søknad om refusjon' })).toBeDisabled();

  })
  it('does not accept file upload over 250kB', () => {
    const mockFile = {
      size: 260000,
      fileName: 'tooLarge.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    } as unknown as File

    global.MutationObserver = window.MutationObserver;
    const view = render(<MemoryRouter><ExcelOpplasting/></MemoryRouter>);
    const uploadButton = view.getByLabelText(/Last opp utfylt Excel-mal/);

    userEvent.upload(uploadButton, mockFile);

    //opplastingsknappen får samme navn som fil hvis den er lastet opp
    expect(view.queryByText('tooLarge')).not.toBeInTheDocument();

    //feilmeldinger skal vises dersom opplasting gikk galt

    expect(view.getByText(/Følgende feil i dokumentet må utbedres før du laster det opp på nytt/)).toBeInTheDocument();
    expect(view.getByText('Du kan ikke laste opp filer større enn 250 kB.')).toBeInTheDocument();
  })

  it('actually mocks', async () => {
    jest.mock('../components/InnsendingExcelFil.ts', () => {
      return new Promise((resolve, reject) => {
        resolve([{ indeks: -1, melding: 'Noe gikk galt' }])

      })
    });
    expect(await InnsendingExcelFil(new File(['(⌐□_□)'], 'fil.xlsx'))).toBe('something');
  })
});

