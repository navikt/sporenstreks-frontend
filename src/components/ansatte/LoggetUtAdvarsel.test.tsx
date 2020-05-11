import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useAppStore } from '../../data/store/AppStore';

import LoggetUtAdvarsel from './LoggetUtAdvarsel';

jest.mock('../../data/store/AppStore');

const mockUseAppStore = useAppStore as jest.Mock

describe('LoggetUtAdvarsel', () => {
  it('should not display anything if the token is valid', () => {
    mockUseAppStore.mockReturnValue({
      tokenExpired: false,
      setTokenExpired: jest.fn()
    });
    render(<LoggetUtAdvarsel/>);

    expect(screen.queryAllByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data').length).toBe(0);
  })

  it('should display the modal if the token is invalid', () => {
    mockUseAppStore.mockReturnValue({
      tokenExpired: true,
      setTokenExpired: jest.fn()
    });
    render(<LoggetUtAdvarsel/>);

    expect(screen.getByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data')).toBeInTheDocument();
  })

  it('should display the modal if the token is invalid and close it when close is clicked', () => {
    const mockSetTokenExpired = jest.fn();
    mockUseAppStore.mockReturnValue({
      tokenExpired: true,
      setTokenExpired: mockSetTokenExpired
    });
    render(<LoggetUtAdvarsel/>);

    const closeLink = screen.getByText(/Jeg har logget inn på nytt/);
    expect(screen.getByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data')).toBeInTheDocument();

    fireEvent.click(closeLink);

    expect(screen.queryAllByText('Du er blitt logget ut, følg instruksjonene for ikke å miste data').length).toBe(0);
    expect(mockSetTokenExpired).toHaveBeenCalledWith(false);

  })
})
