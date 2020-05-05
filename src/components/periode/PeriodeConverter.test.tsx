import React from "react";
import { PeriodeConverter } from "./PeriodeConverter";

describe("PeriodeConverter", () => {

  it("skal returnere tom string", () => {
    expect(PeriodeConverter()).toBeUndefined();
  })

  it("skal returnere riktig format", () => {
    expect(PeriodeConverter(new Date(2020,5,5,17,25))).toBe("2020-06-05");
  })

})
