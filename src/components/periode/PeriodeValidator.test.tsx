import React from "react";
import { Maximum, Feilmelding, isValidFom, isValidTom } from "./PeriodeValidator";

describe("PeriodeValidator", () => {

  it("skal returnere Maximum (ett år frem)", () => {
    expect(Maximum(new Date(2020,5,5,0,0)).getTime()).toBe(new Date(2021,5,5,0,0).getTime());
  })

  it("skal validere fom", () => {
    expect(isValidFom(new Date(2020,5,5,17,25))).toBe(true);
    expect(isValidFom()).toBe(false);
  })

  it("skal validere tom", () => {
    expect(isValidTom(new Date(2020,5,5,17,25))).toBe(true);
    expect(isValidTom()).toBe(false);
  })
})

describe("Feilmelding", () => {

  it("skal ikke returnere feilmelding når fom og tom er satt", () => {
    expect(Feilmelding(false, new Date(), new Date())).toBe(undefined);
  })

  it("skal ikke returnere feilmelding når ikke påkrevet", () => {
    expect(Feilmelding(false, undefined, undefined)).toBe(undefined);
  })

  it("skal returnere feilmelding ved påkrevet", () => {
    expect(Feilmelding(true, undefined, undefined)).toBe('Må fylles ut');
  })

  it("skal returnere feilmelding uten påkrevet", () => {
    expect(Feilmelding(false, undefined, undefined)).toBe(undefined);
  })

  it("skal returnere feilmelding hvor fom er påkrevet", () => {
    expect(Feilmelding(false, undefined, new Date())).toBe('Velg fom dato');
  })

  it("skal returnere feilmelding hvor tom er påkrevet", () => {
    expect(Feilmelding(false, new Date(), undefined)).toBe('Velg tom dato');
  })
})
