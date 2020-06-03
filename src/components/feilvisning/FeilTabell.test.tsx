import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { FeilTabell } from './FeilTabell';
import userEvent from '@testing-library/user-event';

describe('FeilTabell', () => {
  const feil = { melding: 'Du har en feil', indeks: 1 };

  it('should show nothing when given no errors', () => {
    render(<FeilTabell
      feil={[]}
      visAlleFeil={false}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(screen.queryByText(/Følgende feil i dokumentet må utbedres/)).not.toBeInTheDocument();
  })

  it('should show a simple table when given <10 errors', () => {
    const feilListe = Array.from({ length: 9 }, () => (feil))

    const view = render(<FeilTabell
      feil={feilListe}
      visAlleFeil={false}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(view.getByText(/Følgende feil i dokumentet må utbedres/)).toBeInTheDocument();

    expect(view.queryByText(/Vis alle rader med feilmelding/)).not.toBeInTheDocument();
    expect(view.queryByRole('button', { name: /Vis feilmeldingsammendrag/ })).not.toBeInTheDocument();
  })

  it('should show a summary when given >10 errors', () => {
    const feilListe = Array.from({ length: 15 }, () => (feil))

    const view = render(<FeilTabell
      feil={feilListe}
      visAlleFeil={false}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(view.getByText(/15 feil i dokumentet må utbedres/)).toBeInTheDocument();
    expect(view.getByRole('button', { name: /Vis alle rader med feilmelding/ })).toBeInTheDocument();
  })

  it('should show a full list when given >10 errors and visAlleFeil', () => {
    const feilListe = Array.from({ length: 15 }, () => (feil))

    const view = render(<FeilTabell
      feil={feilListe}
      visAlleFeil={true}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(view.getByText(/Følgende feil i dokumentet må utbedres før du laster det opp på nytt:/)).toBeInTheDocument();
    expect(view.getByRole('button', { name: /Vis feilmeldingsammendrag/ })).toBeInTheDocument();

    expect(view.queryByText(/15 feil i dokumentet må utbedres/)).not.toBeInTheDocument();
    expect(view.queryByRole('button', { name: /Vis alle rader med feilmelding/ })).not.toBeInTheDocument();
  })

  it('should toggle between summary and full list', () => {
    const feilListe = Array.from({ length: 15 }, () => (feil))
    const handleSetVisAlleFeil = jest.fn()

    render(<FeilTabell
      feil={feilListe}
      visAlleFeil={false}
      handleSetVisAlleFeil={handleSetVisAlleFeil}
    />);

    const toggleButton = screen.getByRole('button', { name: /Vis alle rader med feilmelding/ })

    userEvent.click(toggleButton);

    expect(screen.getByRole('button', { name: /Vis alle rader med feilmelding/ })).toBeInTheDocument();
    expect(handleSetVisAlleFeil).toHaveBeenCalledTimes(1);
    expect(handleSetVisAlleFeil).lastCalledWith(true);
  })
});
