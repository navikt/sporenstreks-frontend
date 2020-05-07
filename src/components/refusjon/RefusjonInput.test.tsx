import {Convert, RefusjonInput} from './RefusjonInput';
import { render } from "@testing-library/react";
import React from "react";


describe("RefusjonInput", () => {

  describe("Convert", () => {

    it("should return undefined", () => {
      expect(Convert()).toBeUndefined();
    })

    it("should return undefined when empty string", () => {
      expect(Convert("")).toBeUndefined();
    })

    it("should return undefined when string with spaces", () => {
      expect(Convert("     ")).toBeUndefined();
    })

    it("should return value", () => {
      expect(Convert("123")).toBeTruthy();
    })

  })

  it("should display error", () => {
    const rendered = render(<RefusjonInput feilmelding="DummyFeilmelding" handleChange={{}} />);
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeTruthy();
  })

  it("should not display error", () => {
    const rendered = render(<RefusjonInput handleChange={{}} />);
    expect(rendered.queryByText(/DummyFeilmelding/)).toBeFalsy;
  })

  it("should display initial value", () => {
    const rendered = render(<RefusjonInput beloep={1233} handleChange={{}} />);
    expect(rendered.queryByPlaceholderText("Beløp")?.getAttribute("value")).toBe("1233")
  })

  it("should display empty when initial value not set", () => {
    const rendered = render(<RefusjonInput handleChange={{}} />);
    expect(rendered.queryByPlaceholderText("Beløp")?.getAttribute("value")).toBe("")
  })

})
