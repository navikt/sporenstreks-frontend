import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import App from './App';

expect.extend(toHaveNoViolations)

describe('App', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<App/>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()

    cleanup()
  })
  // Dette er testen vi burde ha som mål å få til å virke!
  // it('should have no a11y violations', async () => {
  //   render(<App/>, document.body);
  //   const results = await axe(document.body);
  //   expect(results).toHaveNoViolations();
  // });
})
