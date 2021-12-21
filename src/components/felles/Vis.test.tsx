import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Vis from './Vis';

describe('Vis', () => {
  it('should hide the text when hvis is false', () => {
    render(<Vis hvis={false}>Do you see mee</Vis>);

    expect(screen.queryByText(/Do you see mee/)).toBeFalsy();
  });

  it('should show the text when hvis is true', () => {
    render(<Vis hvis={true}>Do you see mee</Vis>);

    expect(screen.getByText(/Do you see mee/)).toBeTruthy();
  });
});
