import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import DagerInput from './DagerInput';

describe('Dager', () => {
  it('should render the screen', () => {
    render(<DagerInput handleChange={() => true} startdato={new Date()} />);
    expect(screen.queryAllByText('Antall dager:').length).toEqual(1);
  });

  it('should render the screen with error message', () => {
    render(
      <DagerInput
        feilmelding='DagerError'
        handleChange={() => true}
        startdato={new Date()}
      />
    );
    expect(screen.queryAllByText('Antall dager:').length).toEqual(1);
    expect(screen.queryAllByText('DagerError').length).toEqual(1);
  });
});
