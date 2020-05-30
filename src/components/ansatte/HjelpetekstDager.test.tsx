import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations)

import { HjelpetekstDager } from './HjelpetekstDager';

// import Hjelpetekst from "nav-frontend-hjelpetekst";

// jest.mock('nav-frontend-hjelpetekst', () => () => ('<div>HjelpetekstDagerError</div>'));

describe("HjelpetekstDager", () => {
  it("should display the component with a warning", () => {
    const component = render(<HjelpetekstDager />);
    expect(component.queryAllByText(/Helger og helligdager/).length).toEqual(1);
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<HjelpetekstDager />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()

    cleanup()
  })
});
