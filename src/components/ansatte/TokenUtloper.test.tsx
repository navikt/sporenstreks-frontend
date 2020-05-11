import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import timezone_mock from 'timezone-mock';
import TokenUtloper from './TokenUtloper';

jest.mock('./hentInnloggingUtlop');
import hentInnloggingUtløp from './hentInnloggingUtlop';

const mockHentInnloggingUtløp = hentInnloggingUtløp as jest.Mock;

timezone_mock.register('UTC');

describe('TokenUtloper', () => {
  it('should display the time', async () => {
    mockHentInnloggingUtløp.mockResolvedValue({ status: 200, utcDTstring: '2020-01-01T08:55:34.000+0000' });
    render(<TokenUtloper />);

    const timestamp = await screen.findByText('08:55')
    expect(timestamp).toBeInTheDocument();
  })

  it('should display nothing when the timestamp is missing', async () => {
    mockHentInnloggingUtløp.mockResolvedValue({status: 200, utcDTstring: ''});
    render(<TokenUtloper />);
    expect(screen.queryAllByText(/[0-9a-z]/).length).toBe(0);
  })

  it('should display nothing when the token is returned as undefined', () => {
    mockHentInnloggingUtløp.mockResolvedValue({ status: 200, utcDTstring: undefined});
    render(<TokenUtloper />);
    expect(screen.queryAllByText(/[0-9a-z]/).length).toBe(0);
  })

  it('should display nothing when the token is invalid', () => {
    mockHentInnloggingUtløp.mockResolvedValue({ status: 200, utcDTstring: 'invalid-token'});
    render(<TokenUtloper />);
    expect(screen.queryAllByText(/[0-9a-z]/).length).toBe(0);
  })

  it('should display nothing when the status is 404', () => {
    mockHentInnloggingUtløp.mockResolvedValue({ status: 404, utcDTstring: ''});
    render(<TokenUtloper />);
    expect(screen.queryAllByText(/[0-9a-z]/).length).toBe(0);
  })
})
