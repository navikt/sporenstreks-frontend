import Ansatte from './Ansatte';
import { act, fireEvent, render, screen } from '@testing-library/react';
import AppStoreProvider from '../../context/AppStoreContext';
import { ArbeidsgiverProvider } from '../../context/ArbeidsgiverContext';
import { Status } from '../../api/ArbeidsgiverAPI';
import React from 'react';
import { BulkProvider } from '../../context/BulkContext';
import { MemoryRouter } from 'react-router-dom';
import {
  BackendResponseState,
  BackendStatus,
  SkjemaStatus
} from '../../data/types/sporenstreksTypes';
import { Linker } from '../../pages/Linker';
import { TestFnr } from '../fnr/TestFnr';

import MockDate from 'mockdate';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

describe('Ansatte', () => {
  const mockArbeidsgiverValues = [
    {
      Name: 'Navn',
      Type: 'Type',
      OrganizationNumber: '123456789',
      OrganizationForm: 'oform',
      Status: 'Status',
      ParentOrganizationNumber: '3333344444'
    }
  ];
  const ansatte = [
    {
      id: 'abc123',
      fnr: TestFnr.GyldigeFraDolly.TestPerson1,
      fom: '2021-12-11',
      tom: '2021-12-20',
      antallDagerMedRefusjon: 4,
      beloep: 3250,
      status: SkjemaStatus.NY,
      oppdatert: 0
    },
    {
      id: 'def456',
      fnr: TestFnr.GyldigeFraDolly.TestPerson2,
      fom: '2021-04-25',
      tom: '2021-04-27',
      antallDagerMedRefusjon: 1,
      beloep: 1999,
      status: SkjemaStatus.NY,
      oppdatert: 0
    },
    {
      id: 'ghi789',
      fnr: TestFnr.GyldigeFraDolly.TestPerson3,
      fom: '2021-04-28',
      tom: '2021-04-29',
      antallDagerMedRefusjon: 2,
      beloep: 400,
      status: SkjemaStatus.NY,
      oppdatert: 0
    }
  ];
  const feil = [
    { skjemaelementId: 'id1', feilmelding: 'Feilmelding1' },
    { skjemaelementId: 'id2', feilmelding: 'Feilmelding2' }
  ];

  beforeAll(() => {
    MockDate.set('2021-12-24');
  });

  it('viser link til Excel og Enkel skjema', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      screen.getByRole('link', {
        name: 'skal du bruke et eget skjema som du finner her.'
      })
    ).toHaveAttribute('href', '/enkel/');
    expect(
      screen.getAllByRole('link', { name: 'benytte Excel-opplasting.' }).length
    ).toEqual(2);
    expect(
      screen.getAllByRole('link', { name: 'benytte Excel-opplasting.' })[0]
    ).toHaveAttribute('href', '/excel/');
  });

  it('viser headings', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={[]} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByText('Nr.')).toBeInTheDocument();
    expect(screen.getByText('Fødselsnummer:')).toBeInTheDocument();
    expect(
      screen.getByText('Hvilken periode var den ansatte borte?')
    ).toBeInTheDocument();
    expect(screen.getByText('Antall dager:')).toBeInTheDocument();
    expect(screen.getByText('Beløp:')).toBeInTheDocument();
  });

  it('viser antall rader', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    // fnr
    expect(screen.getAllByPlaceholderText('11 siffer')[0]).toHaveProperty(
      'value',
      TestFnr.GyldigeFraDolly.TestPerson1
    );
    expect(screen.getAllByPlaceholderText('11 siffer')[1]).toHaveProperty(
      'value',
      TestFnr.GyldigeFraDolly.TestPerson2
    );
    expect(screen.getAllByPlaceholderText('11 siffer')[2]).toHaveProperty(
      'value',
      TestFnr.GyldigeFraDolly.TestPerson3
    );

    // periode
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy')[0]).toHaveProperty(
      'value',
      '11.12.2021'
    );
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy')[1]).toHaveProperty(
      'value',
      '20.12.2021'
    );
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy')[2]).toHaveProperty(
      'value',
      '25.04.2021'
    );
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy')[3]).toHaveProperty(
      'value',
      '27.04.2021'
    );
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy')[4]).toHaveProperty(
      'value',
      '28.04.2021'
    );
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy')[5]).toHaveProperty(
      'value',
      '29.04.2021'
    );

    // dager
    expect(screen.getAllByRole('combobox')[0]).toHaveProperty('value', '4');
    expect(screen.getAllByRole('combobox')[1]).toHaveProperty('value', '1');
    expect(screen.getAllByRole('combobox')[2]).toHaveProperty('value', '2');

    // refusjon
    expect(screen.getAllByPlaceholderText('Kroner')[0]).toHaveProperty(
      'value',
      '3250'
    );
    expect(screen.getAllByPlaceholderText('Kroner')[1]).toHaveProperty(
      'value',
      '1999'
    );
    expect(screen.getAllByPlaceholderText('Kroner')[2]).toHaveProperty(
      'value',
      '400'
    );

    // slett knapp
    expect(screen.getAllByRole('link', { name: 'Slett' }).length).toEqual(3);
  });

  it.skip('viser feil', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByText(/Feilmelding1/)).toBeInTheDocument();
    expect(screen.getByText(/Feilmelding2/)).toBeInTheDocument();
  });

  it('viser leggtil knapp', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      screen.getByRole('link', { name: '+ Legg til enda en ansatt' })
    ).toBeInTheDocument();
  });

  it('viser erklæring', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      screen.getByRole('checkbox', { name: 'Vi erklærer:' })
    ).toHaveProperty('checked', false);
  });

  it('viser bekreft knapp', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByRole('button', { name: 'Send søknad om refusjon' }));
  });

  it('viser logget ut advarsel', () => {
    render(
      <AppStoreProvider defaultTokenExpired={true}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(
      screen.getByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      )
    ).toBeInTheDocument();
  });

  it('viser IKKE logget ut advarsel', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    expect(
      screen.queryAllByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      ).length
    ).toEqual(0);
  });

  it('viser ikke feilmelding om man klikker send inn etter at man har huket av erklæringen', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const checkbox = screen.getByLabelText('Vi erklærer:');
    fireEvent.click(checkbox);

    const submitButton = screen.getByText('Send søknad om refusjon');
    fireEvent.click(submitButton);

    expect(
      screen.queryAllByText(/krysse av avkrysningsboksen over send-knappen/)
        .length
    ).toEqual(0);
  });

  it('viser feilmelding om man klikker send inn uten å ha sjekket av at man erklærer', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const submitButton = screen.getByText('Send søknad om refusjon');
    fireEvent.click(submitButton);

    expect(
      screen.queryAllByText(/krysse av avkrysningsboksen over send-knappen/)
        .length
    ).toEqual(1);
  });

  it('skjer ingenting om man gjør en submit på formen', () => {
    const { asFragment } = render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const the_form = screen.getByTestId('bulk-form');

    const firstRender = asFragment();

    fireEvent.submit(the_form);

    const secondRender = asFragment();

    expect(firstRender).toEqual(secondRender);
  });

  it('viser valideringsfeil fra backend', async () => {
    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Det er en feil med identitsnummer',
            propertyPath: 'identitetsnummer',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ];

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      // @ts-ignore
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(backendResponce)
      })
    );

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const erklarerCheck = screen.getByText('Vi erklærer:');
    fireEvent.click(erklarerCheck);

    const button = screen.getByText(/Send søknad om refusjon/);
    fireEvent.click(button);

    await act(async () => {
      const buttons = screen.getAllByText(/Send søknad om refusjon/);
      fireEvent.click(buttons[1]);
    });

    expect(screen.getByText('Det er feil i skjemaet'));
    expect(screen.getByText(/Det er en feil med identitsnummer/));
  });

  it('sender brukeren til kvitteringsiden når alt har gått bra i backend, dvs. vi har referansenummer på alle innsendingene', async () => {
    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '2345'
      }
    ];

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      // @ts-ignore
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(backendResponce)
      })
    );

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const erklarerCheck = screen.getByText('Vi erklærer:');
    fireEvent.click(erklarerCheck);

    const button = screen.getByText(/Send søknad om refusjon/);
    fireEvent.click(button);

    await act(async () => {
      const buttons = screen.getAllByText(/Send søknad om refusjon/);
      fireEvent.click(buttons[1]);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith(Linker.BulkKvittering);
  });

  it('skal vise at du har blitt logget av ved 401', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      // @ts-ignore
      Promise.resolve({
        status: 401,
        json: () => {}
      })
    );

    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <ArbeidsgiverProvider
          defaultArbeidsgivere={mockArbeidsgiverValues}
          defaultStatus={Status.Successfully}
        >
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    const erklarerCheck = screen.getByText('Vi erklærer:');
    fireEvent.click(erklarerCheck);

    const button = screen.getByText(/Send søknad om refusjon/);
    fireEvent.click(button);

    await act(async () => {
      const buttons = screen.getAllByText(/Send søknad om refusjon/);
      fireEvent.click(buttons[1]);
    });

    expect(
      screen.getByText(
        /Du er blitt logget ut, følg instruksjonene for ikke å miste data/
      )
    );
  });
});
