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
    const rendered = render(
      <ArbeidsgiverProvider arbeidsgivere={[]} status={Status.Successfully}>
        <EnkelProvider>
          <Router history={history}>
            <Sykepenger />
          </Router>
        </EnkelProvider>
      </ArbeidsgiverProvider>
    );

    expect(
      rendered.getByText(
        'Du har ikke rettigheter til å søke om refusjon for noen bedrifter'
      )
    ).toBeTruthy();
  });

  it('should show infotext when arbeidsgiver has data', () => {
    const history = createMemoryHistory();
    const rendered = render(
      <ArbeidsgiverProvider
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    expect(
      rendered.getByText(
        'Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 6 i de 16 dagene arbeidsgiveren ' +
          'vanligvis skal betale. Den ansatte må være smittet, mistenkt smittet eller i pålagt karantene. Ordningen ' +
          'gjelder fra 1. desember 2021. Dersom arbeidsgiverperioden startet før 1. desember, refunderes ikke dagene ' +
          'før denne datoen.'
      )
    ).toBeTruthy();
  });

  it('gives warning on missing fødselsnummer', async () => {
    const history = createMemoryHistory();
    const rendered = render(
      <ArbeidsgiverProvider
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
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

    expect(rendered.queryAllByText('Fødselsnummer må fylles ut').length).toBe(
      2
    );
  });

  it('gives warning on short fødselsnummer', () => {
    const history = createMemoryHistory();
    const rendered = render(
      <ArbeidsgiverProvider
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
      >
        <EnkelProvider>
          <Router history={history}>
            <Sykepenger />
          </Router>
        </EnkelProvider>
      </ArbeidsgiverProvider>
    );

    const inputNode = rendered.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, { target: { value: '11' } });

    fireEvent(inputNode, new FocusEvent('blur'));

    expect(
      rendered.queryAllByText('Fødselsnummer må ha 11 siffer').length
    ).toBe(2);
  });

  it('gives warning on invalid fødselsnummer', () => {
    const history = createMemoryHistory();
    const rendered = render(
      <ArbeidsgiverProvider
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
      >
        <EnkelProvider>
          <Router history={history}>
            <Sykepenger />
          </Router>
        </EnkelProvider>
      </ArbeidsgiverProvider>
    );

    const inputNode = rendered.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, {
      target: { value: TestFnr.Ugyldige.UgyldigKontrollSiffer }
    });

    fireEvent.blur(inputNode);

    expect(rendered.queryAllByText('Fødselsnummer er ugyldig').length).toBe(2);
  });

  it('gives warning on invalid fødselsnummer', () => {
    const history = createMemoryHistory();

    const rendered = render(
      <ArbeidsgiverProvider
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    const inputNode = rendered.getByLabelText('Fødselsnummer til arbeidstaker');

    fireEvent.change(inputNode, {
      target: { value: TestFnr.GyldigeFraDolly.TestPerson1 }
    }); // Randomly, at least once, generated fødselsnummer

    fireEvent.blur(inputNode);

    expect(rendered.queryAllByText('Fødselsnummer er ugyldig').length).toBe(0);
  });

  it('should not submit when data is missing, but in stead give error', async () => {
    const history = createMemoryHistory();

    render(
      <ArbeidsgiverProvider
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );

    const erklarerCheck = screen.getByText('Vi erklærer:');

    fireEvent.click(erklarerCheck);

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
        arbeidsgivere={arbeidsgivere}
        status={Status.Successfully}
      >
        <Router history={history}>
          <Sykepenger />
        </Router>
      </ArbeidsgiverProvider>
    );
    expect(
      screen.getByRole('link', {
        name: 'skjema for å sende inn flere ansatte samtidig'
      }).href
    ).toEqual('http://localhost/bulk/');
    expect(
      screen.getByRole('link', { name: 'excel-opplasting av kravet.' }).href
    ).toEqual('http://localhost/excel/');
  });
});
