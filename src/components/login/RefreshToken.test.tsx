import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';

import RefreshToken from './RefreshToken';

describe('RefreshToken', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  it('should show the iframe (refresh the token) when component loads', () => {
    const component = render(<RefreshToken />);

    const iframes = component.queryByTestId('refreshtoken-iframe');
    expect(setInterval).toBeCalledTimes(1);
    expect(iframes).toBeTruthy();
  });

  it('should hide the iframe after 20 minutes', () => {
    const component = render(<RefreshToken />);
    act(() => {
      jest.advanceTimersToNextTimer();
    });
    const iframes = component.queryByTestId('refreshtoken-iframe');
    expect(setInterval).toBeCalledTimes(1);
    expect(iframes).toBeFalsy();
  });

  it('should not show the iframe (not refresh the token) again after 40 minutes when we dont have interaction', () => {
    const component = render(<RefreshToken />);

    act(() => {
      jest.advanceTimersByTime(2410000);
    });

    const iframes = component.queryByTestId('refreshtoken-iframe');

    expect(iframes).toBeFalsy();
  });

  it('should show the iframe (refresh the token) again after 40 minutes when we have interaction', () => {
    const map = [];
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const component = render(<RefreshToken />);

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    act(() => {
      map['keydown']({ key: 'Enter', code: 'Enter' });
      map['mousemove']();
    });
    act(() => {
      jest.advanceTimersToNextTimer();
    });

    const iframes = component.queryByTestId('refreshtoken-iframe');

    expect(iframes).toBeTruthy();
  });

  it('should not show the iframe (refresh the token) again after 80 minutes when we have interaction at the beginning', () => {
    const map = [];
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const component = render(<RefreshToken />);

    act(() => {
      jest.advanceTimersToNextTimer();
    });
    act(() => {
      map['keydown']({ key: 'Enter', code: 'Enter' });
      map['mousemove']();
    });
    act(() => {
      jest.advanceTimersToNextTimer();
    });

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    act(() => {
      jest.advanceTimersToNextTimer();
    });

    const iframes = component.queryByTestId('refreshtoken-iframe');

    expect(iframes).toBeFalsy();
  });
});
