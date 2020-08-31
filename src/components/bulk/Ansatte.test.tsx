import Ansatte from './Ansatte';
import { render, screen } from '@testing-library/react';
import AppStoreProvider from '../../context/AppStoreContext';
import { ArbeidsgiverProvider } from '../../context/ArbeidsgiverContext';
import { Status } from '../../api/ArbeidsgiverAPI';
import React from 'react';
import { BulkProvider } from '../../context/BulkContext';
import { MemoryRouter } from 'react-router-dom';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';

describe('Ansatte', () => {

  const mockArbeidsgiverValues =
    [{
      Name: 'Navn',
      Type: 'Type',
      OrganizationNumber: '123456789',
      OrganizationForm: 'oform',
      Status: 'Status',
      ParentOrganizationNumber: '3333344444'
    }];
  const ansatte = [
    { id: 'abc123', fnr: '20111202304', fom: '2020-04-11', tom: '2020-04-20', antallDagerMedRefusjon: 4, beloep: 3250, status: SkjemaStatus.NY, oppdatert: 0 },
    { id: 'def456', fnr: '28119226793', fom: '2020-04-25', tom: '2020-04-27', antallDagerMedRefusjon: 1, beloep: 1999, status: SkjemaStatus.NY, oppdatert: 0 },
    { id: 'ghi789', fnr: '02025916568', fom: '2020-04-28', tom: '2020-04-29', antallDagerMedRefusjon: 2, beloep: 400, status: SkjemaStatus.NY, oppdatert: 0 }
  ];
  const feil = [{ skjemaelementId: 'id1', feilmelding: 'Feilmelding1' }, { skjemaelementId: 'id2', feilmelding: 'Feilmelding2' }];


  it('viser link til Excel og Enkel skjema', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByRole('link', { name: 'skal du bruke et eget skjema som du finner her.' }).href).toEqual('http://localhost/enkel/')
    expect(screen.getByRole('link', { name: 'benyttes Excel-opplasting.' }).href).toEqual('http://localhost/excel/')


  })

  it('viser headings', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={[]} feil={[]}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByText('Nr.'))
    expect(screen.getByText('Fødselsnummer:'))
    expect(screen.getByText('Hvilken periode var den ansatte borte?'))
    expect(screen.getByText('Antall dager:'))
    expect(screen.getByText('Beløp:'))
  })

  it('viser antall rader', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    // fnr
    expect(screen.getAllByPlaceholderText('11 siffer')[0].value).toEqual('20111202304')
    expect(screen.getAllByPlaceholderText('11 siffer')[1].value).toEqual('28119226793')
    expect(screen.getAllByPlaceholderText('11 siffer')[2].value).toEqual('02025916568')

    // periode
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy til dd.mm.yyyy')[1].value).toEqual('11.04.2020 til 20.04.2020')
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy til dd.mm.yyyy')[1].value).toEqual('11.04.2020 til 20.04.2020')
    expect(screen.getAllByPlaceholderText('dd.mm.yyyy til dd.mm.yyyy')[1].value).toEqual('11.04.2020 til 20.04.2020')

    // dager
    expect(screen.getAllByRole('combobox' )[0].value).toEqual('4')
    expect(screen.getAllByRole('combobox' )[1].value).toEqual('1')
    expect(screen.getAllByRole('combobox' )[2].value).toEqual('2')

    // refusjon
    expect(screen.getAllByPlaceholderText('Kroner')[0].value).toEqual('3250')
    expect(screen.getAllByPlaceholderText('Kroner')[1].value).toEqual('1999')
    expect(screen.getAllByPlaceholderText('Kroner')[2].value).toEqual('400')

    // slett knapp
    expect(screen.getAllByRole('link', { name: 'Slett' }).length).toEqual(3)
  })

  it('viser feil', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByText('Det er feil i skjemaet'))
    expect(screen.getByText('Feilmelding1'))
    expect(screen.getByText('Feilmelding2'))
  })

  it('viser leggtil knapp', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByRole('link', { name: '+ Legg til enda en ansatt' }))
  })

  it('viser erklæring', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByRole('checkbox', { name: 'Vi erklærer:' }).checked).toEqual(false)
  })

  it('viser bekreft knapp', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByRole('button', { name: 'Send søknad om refusjon' }))
  })

  it('viser logget ut advarsel', () => {
    render(
      <AppStoreProvider tokenExpired={true}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );
    expect(screen.getByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data'))
  })

  it('viser IKKE logget ut advarsel', () => {
    render(
      <AppStoreProvider tokenExpired={false}>
        <ArbeidsgiverProvider arbeidsgivere={mockArbeidsgiverValues} status={Status.Successfully}>
          <MemoryRouter initialEntries={['/']}>
            <BulkProvider ansatte={ansatte} feil={feil}>
              <Ansatte />
            </BulkProvider>
          </MemoryRouter>
        </ArbeidsgiverProvider>
      </AppStoreProvider>
    );

    expect(screen.queryAllByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data').length).toEqual(0)
  })

})
