import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {FeilTabell} from "./FeilTabell";

describe('FeilTabell', () => {
  const feil = {melding: "Du har en feil", indeks: 1};

  it("should show nothing when given no errors", () => {
    const rendered = render(<FeilTabell
      feil={[]}
      visAlleFeil={false}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
      />);

    expect(rendered.queryByText(/feil i dokumentet/)).toBeFalsy();
  })

  it("should show a simple table when given <10 errors", () => {
    const feilListe = Array.from({length: 9}, () => (feil))

    const rendered = render(<FeilTabell
      feil={feilListe}
      visAlleFeil={false}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(rendered.queryByText(/Følgende feil i dokumentet må utbedres/)).toBeTruthy();
    expect(rendered.queryByText(/Vis alle rader med feilmelding/)).toBeFalsy();
    expect(rendered.queryByText(/Vis feilmeldingsammendrag/)).toBeFalsy();
  })

  it("should show a summary when given >10 errors", () => {
    const feilListe = Array.from({length: 15}, () => (feil))

    const rendered = render(<FeilTabell
      feil={feilListe}
      visAlleFeil={false}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(rendered.queryByText(/15 feil i dokumentet må utbedres/)).toBeTruthy();
    expect(rendered.queryByText(/Vis alle rader med feilmelding/)).toBeTruthy();
  })

  it("should toggle between summary and full list", () => {
    const feilListe = Array.from({length: 15}, () => (feil))

    const rendered = render(<FeilTabell
      feil={feilListe}
      visAlleFeil={true}
      handleSetVisAlleFeil={(passedValue: boolean) => undefined}
    />);

    expect(rendered.queryByText(/Vis feilmeldingsammendrag/)).toBeTruthy();
  })
});
