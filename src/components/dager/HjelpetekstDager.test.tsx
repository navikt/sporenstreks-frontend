import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

import { HjelpetekstDager } from './HjelpetekstDager';

describe('HjelpetekstDager', () => {
  it('should display the component with a warning', () => {
    render(<HjelpetekstDager />);
    expect(screen.queryAllByText(/Helger og helligdager/).length).toEqual(1);
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<HjelpetekstDager />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
