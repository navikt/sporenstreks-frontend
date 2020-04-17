import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import Vis from './Vis';



describe('Vis', () => {
  it("should hide the text when hvis is false", () => {
    const rendered = render(<Vis hvis={false}>Do you see mee</Vis>);

    expect(rendered.queryByText(/Do you see mee/)).toBeFalsy();
  })

  it("should show the text when hvis is true", () => {
    const rendered = render(<Vis hvis={true}>Do you see mee</Vis>);

    expect(rendered.queryByText(/Do you see mee/)).toBeTruthy();
  })
});
