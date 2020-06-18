import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations)

import EksempelBulk from './EksempelBulk';

describe('EksempelBulk', () => {
  it('should display the component with a warning', () => {
    const component = render(<EksempelBulk />);
    expect(component.queryAllByText(/Slik finner dere beløpet/).length).toEqual(0);

    const knappen = component.getByText(/Hjelp/);

    fireEvent.click(knappen);

    expect(component.queryAllByText(/Slik finner dere beløpet/).length).toEqual(1);

    const lukkKnappen = component.getByText(/Lukk dette vinduet/);

    fireEvent.click(lukkKnappen);

    expect(component.queryAllByText(/Slik finner dere beløpet/).length).toEqual(0);
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<EksempelBulk />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()

    cleanup()
  })
});
