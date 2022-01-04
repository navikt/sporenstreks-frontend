import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

import HjelpetekstRefusjon from './HjelpetekstRefusjon';

describe('HjelpetekstRefusjon', () => {
  it('should display the component with a warning', () => {
    render(<HjelpetekstRefusjon />);
    expect(screen.queryAllByText(/Slik finner dere beløpet/).length).toEqual(0);

    const knappen = screen.getByText(/Hjelp/);

    fireEvent.click(knappen);

    expect(screen.queryAllByText(/Slik finner dere beløpet/).length).toEqual(1);

    const lukkKnappen = screen.getByText(/Lukk dette vinduet/);

    fireEvent.click(lukkKnappen);

    expect(screen.queryAllByText(/Slik finner dere beløpet/).length).toEqual(0);
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<HjelpetekstRefusjon />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
