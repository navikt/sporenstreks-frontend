import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';
import AppStoreProvider from '../../context/AppStoreContext';

describe('LoggetUtAdvarsel', () => {
  it('should not display anything if the token is valid', () => {
    render(
      <AppStoreProvider defaultTokenExpired={false}>
        <LoggetUtAdvarsel />
      </AppStoreProvider>
    );

    expect(
      screen.queryAllByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      ).length
    ).toBe(0);
  });

  it('should display the modal if the token is invalid', () => {
    render(
      <AppStoreProvider defaultTokenExpired={true}>
        <LoggetUtAdvarsel />
      </AppStoreProvider>
    );

    expect(
      screen.getByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      )
    ).toBeInTheDocument();
  });

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    render(
      <AppStoreProvider defaultTokenExpired={true}>
        <LoggetUtAdvarsel />
      </AppStoreProvider>
    );

    const closeLink = screen.getByText(/Jeg har logget inn på nytt/);
    expect(
      screen.getByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      )
    ).toBeInTheDocument();

    fireEvent.click(closeLink);

    expect(
      screen.queryAllByText(
        'Du er blitt logget ut, følg instruksjonene for ikke å miste data'
      ).length
    ).toBe(0);
  });
});
