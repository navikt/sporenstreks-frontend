import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import IngenData from './IngenData';

describe('IngenData', () => {
  it('should render the component and display a warning text', () => {
    render(<IngenData />);
    expect(
      screen.queryAllByText(/Vi får akkurat nå ikke hentet alle data./).length
    ).toBe(1);
  });
});
