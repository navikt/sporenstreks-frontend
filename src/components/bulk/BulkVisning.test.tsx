import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import BulkVisning from './BulkVisning';

expect.extend(toHaveNoViolations);

describe('BulkVisning', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(
      <BulkVisning label='Test label'>Test tekst</BulkVisning>
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();

    cleanup();
  });
});
