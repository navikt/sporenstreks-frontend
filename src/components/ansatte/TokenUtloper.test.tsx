import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import TokenUtloper from './TokenUtloper';
import timezone_mock from 'timezone-mock';

describe('TokenUtloper', () => {

  timezone_mock.register('UTC');

  let container:Element | DocumentFragment | null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should display the time',  async () => {

    const fakeUtløpstid = '2020-01-01T08:55:34.000+0000';
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(fakeUtløpstid)
        });
      }
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<TokenUtloper />, container);
    });

    expect(container.textContent).toBe('08:55');
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  })

  it('should display nothing when the timestamp is missing', async () => {
    const fakeUtløpstid = '';
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(fakeUtløpstid)
        });
      }
    );

    await act(async () => {
      render(<TokenUtloper />, container);
    });
    expect(container.textContent).toBe('');
  })

  it('should display nothing when the token is returned as undefined', async () => {
    const fakeUtløpstid = undefined;
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(fakeUtløpstid)
        });
      }
    );

    await act(async () => {
      render(<TokenUtloper />, container);
    });
    expect(container.textContent).toBe('');
  })

  it('should display nothing when the token is invalid', async () => {

    const fakeUtløpstid = 'invalid-token';
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(fakeUtløpstid)
        });
      }
    );

    await act(async () => {
      render(<TokenUtloper />, container);
    });
    expect(container.textContent).toBe('');
  })

  it('should display nothing when the status is 404', async () => {
    const fakeUtløpstid = '';
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        return Promise.resolve({
          status: 404,
          json: () => Promise.resolve(fakeUtløpstid)
        });
      }
    );

    await act(async () => {
      render(<TokenUtloper />, container);
    });
    expect(container.textContent).toBe('');
  })
})
