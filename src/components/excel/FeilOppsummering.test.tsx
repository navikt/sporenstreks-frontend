import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FeilOppsummering from './FeilOppsummering';

describe('FeilOppsummering', () => {
  it('should only show the wrapper when there are no errors', () => {
    const input = {};
    const rendered = render(<FeilOppsummering errors={input} />);

    expect(rendered.queryByText(/feil i skjemaet/)).toBeFalsy();
  });

  it('should show the error count when there is one error', () => {
    const input = { errror: 'error' };
    const rendered = render(<FeilOppsummering errors={input} />);

    expect(rendered.queryByText(/Det er 1 feil i skjemaet/)).toBeTruthy();
  });

  it('should show the error count and error descriptions when there is two errors', () => {
    const input = {
      fnr: {
        type: 'Fødselsnummer må fylles ut',
        ref: {},
        isManual: true
      },
      periode_0: {
        type: 'Perioden må ha to gyldige datoer',
        ref: {
          name: 'periode_0'
        },
        isManual: true
      }
    };

    const rendered = render(<FeilOppsummering errors={input} />);

    expect(rendered.queryByText(/Det er 2 feil i skjemaet/)).toBeTruthy();
    expect(rendered.queryByText(/Fødselsnummer må fylles ut/)).toBeTruthy();
    expect(
      rendered.queryByText(/Perioden må ha to gyldige datoer/)
    ).toBeTruthy();
  });

  it('should scroll the corresponding input field into view on click', () => {
    const stub = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = stub;

    const input = {
      fnr: {
        type: 'Fødselsnummer må fylles ut',
        ref: {},
        isManual: true
      },
      periode_0: {
        type: 'Perioden må ha to gyldige datoer',
        ref: {
          name: 'periode_0'
        },
        isManual: true
      }
    };

    const rendered = render(
      <div>
        <input id='fnr' />
        <FeilOppsummering errors={input} />
      </div>
    );

    const linkText = rendered.getByText(/Fødselsnummer må fylles ut/);

    fireEvent.click(linkText);

    expect(stub).toHaveBeenCalledTimes(1);
  });

  it('should scroll the corresponding input field into view when enter has been clicked', () => {
    const stub = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = stub;

    const input = {
      fnr: {
        type: 'Fødselsnummer må fylles ut',
        ref: {},
        isManual: true
      },
      periode_0: {
        type: 'Perioden må ha to gyldige datoer',
        ref: {
          name: 'periode_0'
        },
        isManual: true
      }
    };

    const rendered = render(
      <div>
        <input id='fnr' />
        <FeilOppsummering errors={input} />
      </div>
    );

    const linkText = rendered.getByText(/Fødselsnummer må fylles ut/);

    fireEvent.keyDown(linkText, { key: 'Enter', keyCode: 13 });

    expect(stub).toHaveBeenCalledTimes(1);
  });
});
