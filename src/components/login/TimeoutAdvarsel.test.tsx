import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import TimeoutAdvarsel from './TimeoutAdvarsel';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'jest-axe';


describe('TimeoutAdvarsel',() => {
  it('should display a modal', () => {
    render(<MemoryRouter initialEntries={[`/`]}><TimeoutAdvarsel/></MemoryRouter>);
    expect(screen.getByText(/Du blir logget ut etter 60 minutter/)).toBeInTheDocument();
  })

  it('should close a modal on button press', () => {
    render(<MemoryRouter initialEntries={[`/`]}><TimeoutAdvarsel/></MemoryRouter>);
    const button = screen.getByText('Lukk');

    fireEvent.click(button);

    expect(screen.queryByText(/Du blir logget ut etter 60 minutter/)).not.toBeInTheDocument();
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<MemoryRouter initialEntries={[`/`]}><TimeoutAdvarsel/></MemoryRouter>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  });
})
