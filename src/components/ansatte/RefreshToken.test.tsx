import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import RefreshToken from './RefreshToken';
jest.useFakeTimers();

describe('RefreshToken', () => {
  it('should show the iframe when component loads', () => {
    const component = render(<RefreshToken />);

    const iframes = component.getByTestId('jwt-refresh-token-iframe');

    expect(iframes).toBeTruthy();
  })

  it('should hide the iframe after 20 minutes', () => {
    const component = render(<RefreshToken />);

    jest.advanceTimersByTime(1210000);

    const iframes = component.queryByTestId('jwt-refresh-token-iframe');

    expect(iframes).toBeFalsy();
  })

  it('should show the iframe again after 40 minutes', () => {
    const component = render(<RefreshToken />);

    jest.advanceTimersByTime(2410000);

    const iframes = component.queryByTestId('jwt-refresh-token-iframe');

    expect(iframes).toBeTruthy();
  })
})
