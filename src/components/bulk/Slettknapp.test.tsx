import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

import Slettknapp from './Slettknapp';

describe('Slettknapp', () => {
  it('should display the component and handle a button click', () => {
    const mockKnapp = jest.fn();
    const component = render(<Slettknapp onClick={mockKnapp} />);

    const knappen = component.getByText(/Slett/);

    fireEvent.click(knappen);

    expect(mockKnapp).toHaveBeenCalled();
  });

  it('should have no a11y violations', async () => {
    const mockKnapp = jest.fn();
    const { container } = render(<Slettknapp onClick={mockKnapp} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
