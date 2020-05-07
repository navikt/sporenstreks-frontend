import { PeriodeInput, PeriodeInputClassName } from './PeriodeInput';
import { render } from "@testing-library/react";
import React from "react";

describe("PeriodeInput", () => {

  it("should display feilmelding", () => {
    const rendered = render(<PeriodeInput feilmelding="DummyFeilmelding" handleChange={{}} />);
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeTruthy();
  })
  it("should not display feilmelding", () => {
    const rendered = render(<PeriodeInput handleChange={{}} />);
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeFalsy();
  })

  it("should use correct css without error", () => {
    expect(PeriodeInputClassName()).toBe("periodeinput periodeinput--valid")
  })
  it("should use correct css with error", () => {
    expect(PeriodeInputClassName('DummyFeilmelding')).toBe("periodeinput periodeinput--invalid")
  })

  it("should call handleChange when handleClose is called", () => {
    // TODO - Implementere test som sjekker at handleChange blir kalt
  })
  it("should update state when handleClose is called", () => {
    // TODO - Implementere test som sjekker at feilmelding blir satt i state
  })

})
