import { PeriodeInput, PeriodeInputClassName } from './PeriodeInput';
import { render } from "@testing-library/react";
import React from "react";

describe("PeriodeInput", () => {

  it("skal vise feilmelding", () => {
    const rendered = render(<PeriodeInput feilmelding="DummyFeilmelding" handleChange={{}} />);
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeTruthy();
  })
  it("skal ikke vise feilmelding", () => {
    const rendered = render(<PeriodeInput handleChange={{}} />);
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeFalsy();
  })

  it("skal vise rett css uten feilmelding", () => {
    expect(PeriodeInputClassName()).toBe("periodeinput periodeinput--valid")
  })
  it("skal vise rett css med feilmelding", () => {
    expect(PeriodeInputClassName('DummyFeilmelding')).toBe("periodeinput periodeinput--invalid")
  })

  it("skal kalle handleChange når handleClose blir kalt", () => {
    // TODO - Implementere test som sjekker at handleChange blir kalt
  })
  it("skal sette feilmelding", () => {
    // TODO - Implementere test som sjekker at feilmelding blir satt i state
  })

})
