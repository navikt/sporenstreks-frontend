import {prepareStringToInt, RefusjonInput, getSpecialCharsOnSides, formatNumber} from './RefusjonInput';
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";


describe("RefusjonInput", () => {

  describe("prepareStringToInt", () => {

    it("should return empty string", () => {
      expect(prepareStringToInt(undefined)).toBe('');
    })

    it("should return empty string when empty string", () => {
      expect(prepareStringToInt("")).toBe('');
    })

    it("should return empty string when string with spaces", () => {
      expect(prepareStringToInt("     ")).toBe('');
    })

    it("should return value", () => {
      expect(prepareStringToInt("123")).toBe('123');
    })

    it("should return value without spaces", () => {
      expect(prepareStringToInt("12 345")).toBe('12345');
    })

    it("should return value with , prepareStringToInted to .", () => {
      expect(prepareStringToInt("12,345")).toBe('12.345');
    })

  })

  describe('getSpecialCharsOnSides', () => {
    it('should return 1 character on both sides', () => {
      expect(getSpecialCharsOnSides("123 456.78", 5)).toStrictEqual([1,1]);
    })

    it('should return 0 char on left an 2 on the right', () => {
      expect(getSpecialCharsOnSides("123 456.78", 1)).toStrictEqual([0,2]);
    })

    it('should return 0 char on left an 2 on the right', () => {
      expect(getSpecialCharsOnSides("123 456.78", 9)).toStrictEqual([2,0]);
    })
  })

  describe('formatNumber', () => {
      it('should return an empty string when no input is given', () => {
        expect(formatNumber(undefined)).toBe('');
      })

      it('should return a nicely formated string when input is given', () => {
        expect(formatNumber(123456789)).toBe('123,456,789.00');
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

  it("should display initial value. English format because of lacking support in node...", () => {
    const rendered = render(<RefusjonInput beloep={1233} handleChange={{}} />);
    expect(rendered.queryByPlaceholderText("Beløp")?.getAttribute("value")).toBe("1,233.00")
  })

  it("should display empty when initial value not set", () => {
    const rendered = render(<RefusjonInput handleChange={{}} />);
    expect(rendered.queryByPlaceholderText("Beløp")?.getAttribute("value")).toBe("")
  })

  it('shold give an error if the amount is too high', () => {
    const changeHandler = jest.fn();
    const expected = 1234567;
    render(<RefusjonInput handleChange={changeHandler} />);

    const inputFelt = screen.getByRole('textbox');

    fireEvent.change(inputFelt, { target: { value: "1 234 567" } });

    expect(changeHandler).toHaveBeenCalledWith(expected)
  })

})
