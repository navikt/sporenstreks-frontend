import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ArbeidsgiverProvider } from '../context/ArbeidsgiverContext';
import Sykepenger from './Sykepenger';
import { Status } from '../api/ArbeidsgiverAPI';
import { act } from 'react-dom/test-utils';
import EnkelProvider from '../context/EnkelContext';
import { TestFnr } from '../components/fnr/TestFnr';
import userEvent from '@testing-library/user-event';

const arbeidsgivere = [
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

describe('Sykepenger', () => {
  it('should show warning when arbeidsgiver contains no data', () => {
    const history = createMemoryHistory();
    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={[]}
        defaultStatus={Status.Successfully}
      >
        <EnkelProvider>
          <Router history={history}>
            <Sykepenger />
          </Router>
        </EnkelProvider>
      </ArbeidsgiverProvider>
    );

    expect(
      screen.getByText(
        'Du har ikke rettigheter til å søke om refusjon for noen bedrifter'
      )
    ).toBeTruthy();
  });

  it('should show infotext when arbeidsgiver has data', () => {
    const history = createMemoryHistory();
    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    expect(
      screen.getByText(
        'Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 6 i de 16 dagene arbeidsgiveren ' +
          'vanligvis skal betale. Den ansatte må være smittet, mistenkt smittet eller i pålagt karantene. Ordningen ' +
          'gjelder fra 1. desember 2021. Dersom arbeidsgiverperioden startet før 1. desember, refunderes ikke dagene ' +
          'før denne datoen.'
      )
    ).toBeTruthy();
  });

  it('gives warning on missing fødselsnummer', async () => {
    const history = createMemoryHistory();
    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    const submitBtn = screen.getByText('Send søknad om refusjon');

    await act(async () => {
      fireEvent.submit(submitBtn);
    });

    expect(screen.queryAllByText('Fødselsnummer må fylles ut').length).toBe(2);
  });

  it('gives warning on short fødselsnummer', () => {
    const history = createMemoryHistory();
    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <EnkelProvider>
          <Router history={history}>
            <Sykepenger />
          </Router>
        </EnkelProvider>
      </ArbeidsgiverProvider>
    );

    const inputNode = screen.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, { target: { value: '11' } });

    fireEvent(inputNode, new FocusEvent('blur'));

    expect(screen.queryAllByText('Fødselsnummer må ha 11 siffer').length).toBe(
      2
    );
  });

  it('gives warning on invalid fødselsnummer', () => {
    const history = createMemoryHistory();
    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <EnkelProvider>
          <Router history={history}>
            <Sykepenger />
          </Router>
        </EnkelProvider>
      </ArbeidsgiverProvider>
    );

    const inputNode = screen.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, {
      target: { value: TestFnr.Ugyldige.UgyldigKontrollSiffer }
    });

    fireEvent.blur(inputNode);

    expect(screen.queryAllByText('Fødselsnummer er ugyldig').length).toBe(2);
  });

  it('gives np warning on valid fødselsnummer', () => {
    const history = createMemoryHistory();

    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    const inputNode = screen.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, {
      target: { value: TestFnr.GyldigeFraDolly.TestPerson1 }
    }); // Randomly, at least once, generated fødselsnummer

    fireEvent.blur(inputNode);

    expect(screen.queryAllByText('Fødselsnummer er ugyldig').length).toBe(0);
  });

  it('should not submit when data is missing, but in stead give error', async () => {
    const history = createMemoryHistory();

    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    const erklarerCheck = screen.getByText('Vi erklærer:');

    userEvent.click(erklarerCheck);

    const submitButton = screen.getByText('Send søknad om refusjon');

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(screen.queryAllByText(/Fødselsnummer må fylles ut/).length).toBe(2);
    expect(screen.queryAllByText(/Dato må fylles ut/).length).toBe(4);
    expect(screen.queryAllByText(/Antall dager må fylles ut/).length).toBe(2);
    expect(screen.queryAllByText(/Beløp må fylles ut/).length).toBe(2);
  });

  it('show links to the other forms', async () => {
    const history = createMemoryHistory();
    render(
      <ArbeidsgiverProvider
        defaultArbeidsgivere={arbeidsgivere}
        defaultStatus={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );
    expect(
      screen.getByRole('link', {
        name: 'skjema for å sende inn flere ansatte samtidig'
      })
    ).toHaveAttribute('href', '/bulk/');
    expect(
      screen.getAllByRole('link', { name: 'benytte Excel-opplasting.' }).length
    ).toEqual(2);
    expect(
      screen.getAllByRole('link', { name: 'benytte Excel-opplasting.' })[0]
    ).toHaveAttribute('href', '/excel/');
  });
});
