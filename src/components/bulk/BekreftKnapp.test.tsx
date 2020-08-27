import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen, cleanup, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import BekreftKnapp from './BekreftKnapp';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { Ansatt } from './Ansatt';
import { BulkProvider } from '../../context/BulkContext';
import { ArbeidsgiverProvider } from '../../context/ArbeidsgiverContext';
import { Status } from '../../api/ArbeidsgiverAPI';

expect.extend(toHaveNoViolations)

const mockAnsatteOK: Ansatt[] = [
  {
    id: 123,
    fnr: '27036405924',
    fom: '2020-01-01',
    tom: '2020-02-02',
    antallDagerMedRefusjon: 1,
    beloep: 1234,
    status: SkjemaStatus.NY,
    oppdatert: 1
  },
  {
    id: 1234,
    fnr: '30040658641',
    fom: '2020-03-03',
    tom: '2020-04-04',
    antallDagerMedRefusjon: 1,
    beloep: 123,
    status: SkjemaStatus.NY,
    oppdatert: 1
  }
];

const mockAnsatteNotOK: Ansatt[] = [
  {
    id: 123,
    fnr: '27036405924',
    fom: '',
    tom: '',
    antallDagerMedRefusjon: 2,
    beloep: 123,
    status: SkjemaStatus.NY,
    oppdatert: 1
  },
  {
    id: 123,
    fnr: '30040658641',
    fom: '',
    tom: '',
    antallDagerMedRefusjon: 2,
    beloep: 123,
    status: SkjemaStatus.NY,
    oppdatert: 1
  }
];

describe('BekreftKnapp', () => {
  it('should only fire click when erklæringAkseptert is false', () => {
    const mockOnSubmmit = jest.fn();
    const mockOnClick = jest.fn();
    const erklæringAkseptert = false;

    render(
      <ArbeidsgiverProvider status={Status.Successfully} arbeidsgivere={[]}>
        <BulkProvider ansatte={mockAnsatteOK}>
          <BekreftKnapp onSubmit={mockOnSubmmit} onClick={mockOnClick} erklæringAkseptert={erklæringAkseptert} />
        </BulkProvider>
      </ArbeidsgiverProvider>
    );

    const button = screen.getByText(/Send søknad om refusjon/);

    act(async () => {
      fireEvent.click(button);
    });

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
  });

  it('should fire click and show modal when erklæringAkseptert is true', () => {
    const mockOnSubmmit = jest.fn();
    const mockOnClick = jest.fn();
    const mockSetFeil = jest.fn();
    const erklæringAkseptert = true;

    render(
      <ArbeidsgiverProvider status={Status.Successfully} arbeidsgivere={[]}>
        <BulkProvider ansatte={mockAnsatteOK}>
          <BekreftKnapp onSubmit={mockOnSubmmit} onClick={mockOnClick} erklæringAkseptert={erklæringAkseptert} />
        </BulkProvider>
      </ArbeidsgiverProvider>
    );

    const button = screen.getByText(/Send søknad om refusjon/);

    act(() => {
      fireEvent.click(button);
    });

    // expect(mockSetFeil).toHaveBeenCalledWith([]);
    expect(mockOnClick).toHaveBeenCalled();
    expect(screen.getByText(/Organisasjonsnummer/)).toBeInTheDocument();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
  });

  it('should fire click, show modal and fire submit when erklæringAkseptert is true and modal submit button is clicked', () => {
    const mockOnSubmmit = jest.fn();
    const mockOnClick = jest.fn();
    const erklæringAkseptert = true;
    const mockFeil = [];

    render(
      <ArbeidsgiverProvider status={Status.Successfully} arbeidsgivere={[]}>
        <BulkProvider ansatte={mockAnsatteOK} feil={mockFeil}>
          <BekreftKnapp onSubmit={mockOnSubmmit} onClick={mockOnClick} erklæringAkseptert={erklæringAkseptert} />
        </BulkProvider>
      </ArbeidsgiverProvider>
    );

    const button = screen.getByText(/Send søknad om refusjon/);

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
    expect(screen.getByText(/Organisasjonsnummer/)).toBeInTheDocument();

    const buttonList = screen.getAllByText(/Send søknad om refusjon/);
    const modalButton = buttonList[1];
    fireEvent.click(modalButton);

    expect(mockFeil).toEqual([]);
    // expect(mockSetFeil).toHaveBeenCalledWith([]);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).toHaveBeenCalled();
  });

  it('should fire click, show modal and not fire submit when erklæringAkseptert is true and modal avbryt button is clicked', () => {
    const mockOnSubmmit = jest.fn();
    const mockOnClick = jest.fn();
    const erklæringAkseptert = true;

    render(
      <ArbeidsgiverProvider status={Status.Successfully} arbeidsgivere={[]}>
        <BulkProvider ansatte={mockAnsatteOK}>
          <BekreftKnapp onSubmit={mockOnSubmmit} onClick={mockOnClick} erklæringAkseptert={erklæringAkseptert} />
        </BulkProvider>
      </ArbeidsgiverProvider>
    );

    const button = screen.getByText(/Send søknad om refusjon/);

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
    expect(screen.getByText(/Organisasjonsnummer/)).toBeInTheDocument();

    const modalButton = screen.getByText(/Avbryt/);
    fireEvent.click(modalButton);

    // expect(mockSetFeil).toHaveBeenCalledWith([]);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
    expect(screen.queryAllByText(/Organisasjonsnummer/).length).toBe(0);
  });


  it('should fire click, show modal and fire submit when erklæringAkseptert is true, ansatte is invalid and modal submit button is clicked', () => {
    const mockOnSubmmit = jest.fn();
    const mockOnClick = jest.fn();
    const mockSetFeil = jest.fn();
    const erklæringAkseptert = true;

    const expected = [
      {
        'feilmelding': 'Det er en feil i rad nr 1',
        'skjemaelementId': 'fnr_123',
      },
      {
        'feilmelding': 'Det er en feil i rad nr 2',
        'skjemaelementId': 'fnr_123',
      },
    ];

    render(
      <ArbeidsgiverProvider status={Status.Successfully} arbeidsgivere={[]}>
        <BulkProvider ansatte={mockAnsatteNotOK} feil={expected}>
          <BekreftKnapp onSubmit={mockOnSubmmit} onClick={mockOnClick} erklæringAkseptert={erklæringAkseptert} />
        </BulkProvider>
      </ArbeidsgiverProvider>
    );

    const button = screen.getByText(/Send søknad om refusjon/);

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
    expect(screen.queryAllByText(/Organisasjonsnummer/).length).toBe(0);

    // expect(mockSetFeil).toHaveBeenCalledWith(expected);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnSubmmit).not.toHaveBeenCalled();
  });

  it('should have no a11y violations', async () => {
    const mockOnSubmmit = jest.fn();
    const mockOnClick = jest.fn();
    const erklæringAkseptert = true;

    const { container } = render(
      <ArbeidsgiverProvider status={Status.Successfully} arbeidsgivere={[]}>
        <BulkProvider ansatte={mockAnsatteOK}>
          <BekreftKnapp onSubmit={mockOnSubmmit} onClick={mockOnClick} erklæringAkseptert={erklæringAkseptert} />
        </BulkProvider>
      </ArbeidsgiverProvider>
    );

    const button = screen.getByText(/Send søknad om refusjon/);

    const resultsBeforeClick = await axe(container)

    expect(resultsBeforeClick).toHaveNoViolations()


    fireEvent.click(button);

    const results = await axe(container)

    expect(results).toHaveNoViolations()

    cleanup()
  })
});
