import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import DagerInput from './DagerInput';

describe('Dager', () => {
  it('should render the component', () => {
    const component = render(<DagerInput handleChange={() => true}/>);
    expect(component.queryAllByText('EnkelDager dager:').length).toEqual(1);
  });

  it('should render the component with error message', () => {
    const component = render(<DagerInput feilmelding='DagerError' handleChange={() => true}/>);
    expect(component.queryAllByText('EnkelDager dager:').length).toEqual(1);
    expect(component.queryAllByText('DagerError').length).toEqual(1);
  });
});
