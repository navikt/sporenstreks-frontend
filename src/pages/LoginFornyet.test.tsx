import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import LoginFornyet from './LoginFornyet';

expect.extend(toHaveNoViolations);

describe('LoginFornyet', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<LoginFornyet />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
