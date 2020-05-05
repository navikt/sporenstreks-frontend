import React from "react";
import { PeriodeFormatter } from "./PeriodeFormatter";

describe("PeriodeFormatter", () => {

  it("skal returnere tom string", () => {
    expect(PeriodeFormatter()).toBeUndefined();
  })

  it("skal returnere riktig format", () => {
    expect(PeriodeFormatter(
      new Date(2020,5,5,17,25),
      new Date(2021,6,6,18, 5))
    ).toBe("2020-06-05 til 2021-07-06");
  })

  it("skal returnere riktig format uten tom", () => {
    expect(PeriodeFormatter(
      new Date(2020,5,5,17,25))
    ).toBe("2020-06-05");
  })

  it("skal returnere riktig format uten fom", () => {
    expect(PeriodeFormatter(
      undefined,
      new Date(2021,6,6,18, 5))
    ).toBe("2021-07-06");
  })

})
