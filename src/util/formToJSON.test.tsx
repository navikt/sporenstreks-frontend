import React from 'react';

import formToJSON from './formToJSON';

describe('formToJSON', () => {
  it('returns an empty object when no form elements are given.', () => {
    const form: HTMLFormControlsCollection = document.forms;

    const jsonData = formToJSON(form);
    expect(jsonData).toEqual({});
  });

  it('returns an object when form is given.', () => {
    const input = [{
      name: "test",
      value: "value"
    },{
      name: "test2",
      value: "value2"
    }]

    const jsonData = formToJSON(input);
    expect(jsonData).toEqual({
      test: "value",
      test2: "value2"
    });
  });
});
