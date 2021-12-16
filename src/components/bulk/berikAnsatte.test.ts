import berikAnsatte from './berikAnsatte';
import {
  BackendStatus,
  Ansatt,
  BackendResponseState
} from '../../data/types/sporenstreksTypes';

describe('berikAnsatte', () => {
  it('should add validation errors', () => {
    const ansatte: Ansatt[] = [
      {
        id: 1,
        fnr: '1',
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: '2',
        fom: 'fom',
        tom: 'tom',
        status: 2,
        oppdatert: 2
      },
      {
        id: 3,
        fnr: '3',
        fom: 'fom',
        tom: 'tom',
        status: 3,
        oppdatert: 3
      }
    ];

    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation periode error',
            propertyPath: 'perioder[0].tom',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation identitetsnummer error',
            propertyPath: 'identitetsnummer',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ];

    const expected: Ansatt[] = [
      {
        fnr: '1',
        fom: 'fom',
        id: 1,
        oppdatert: 1,
        referenceNumber: '1234',
        status: 2,
        tom: 'tom'
      },
      {
        fnr: '2',
        fom: 'fom',
        id: 2,
        oppdatert: 2,
        periodeError: 'Validation periode error.',
        status: 3,
        tom: 'tom'
      },
      {
        fnr: '3',
        fnrError: 'Validation identitetsnummer error.',
        fom: 'fom',
        id: 3,
        oppdatert: 3,
        status: 3,
        tom: 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  });

  it('should add validation errors and concattinate if multiple', () => {
    const ansatte: Ansatt[] = [
      {
        id: 1,
        fnr: '1',
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: '2',
        fom: 'fom',
        tom: 'tom',
        status: 2,
        oppdatert: 2
      },
      {
        id: 3,
        fnr: '3',
        fom: 'fom',
        tom: 'tom',
        status: 3,
        oppdatert: 3
      }
    ];

    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation periode error',
            propertyPath: 'perioder[0].tom',
            invalidValue: 'fom'
          },
          {
            validationType: 'type',
            message: 'Validation generic periode error',
            propertyPath: 'perioder',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation identitetsnummer error.',
            propertyPath: 'identitetsnummer',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ];

    const expected: Ansatt[] = [
      {
        fnr: '1',
        fom: 'fom',
        id: 1,
        oppdatert: 1,
        referenceNumber: '1234',
        status: 2,
        tom: 'tom'
      },
      {
        fnr: '2',
        fom: 'fom',
        id: 2,
        oppdatert: 2,
        periodeError:
          'Validation periode error. Validation generic periode error.',
        status: 3,
        tom: 'tom'
      },
      {
        fnr: '3',
        fnrError: 'Validation identitetsnummer error.',
        fom: 'fom',
        id: 3,
        oppdatert: 3,
        status: 3,
        tom: 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  });

  it('should set the status for generic error', () => {
    const ansatte: Ansatt[] = [
      {
        id: 1,
        fnr: '1',
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: '2',
        fom: 'fom',
        tom: 'tom',
        status: 2,
        oppdatert: 2
      },
      {
        id: 3,
        fnr: '3',
        fom: 'fom',
        tom: 'tom',
        status: 3,
        oppdatert: 3
      }
    ];

    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: BackendResponseState.GENERIC_ERROR,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation periode error',
            propertyPath: 'perioder[0].tom',
            invalidValue: 'fom'
          },
          {
            validationType: 'type',
            message: 'Validation generic periode error',
            propertyPath: 'perioder',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation identitetsnummer error.',
            propertyPath: 'identitetsnummer',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ];

    const expected: Ansatt[] = [
      {
        fnr: '1',
        fom: 'fom',
        id: 1,
        oppdatert: 1,
        referenceNumber: '1234',
        status: 2,
        tom: 'tom'
      },
      {
        fnr: '2',
        fom: 'fom',
        id: 2,
        oppdatert: 2,
        status: 4,
        tom: 'tom'
      },
      {
        fnr: '3',
        fnrError: 'Validation identitetsnummer error.',
        fom: 'fom',
        id: 3,
        oppdatert: 3,
        status: 3,
        tom: 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  });

  it('should set the status for virksomhetsnummer', () => {
    const ansatte: Ansatt[] = [
      {
        id: 1,
        fnr: '1',
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        id: 2,
        fnr: '2',
        fom: 'fom',
        tom: 'tom',
        status: 2,
        oppdatert: 2
      },
      {
        id: 3,
        fnr: '3',
        fom: 'fom',
        tom: 'tom',
        status: 3,
        oppdatert: 3
      }
    ];

    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.OK,
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: BackendResponseState.GENERIC_ERROR,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation periode error',
            propertyPath: 'perioder[0].tom',
            invalidValue: 'fom'
          },
          {
            validationType: 'type',
            message: 'Validation generic periode error',
            propertyPath: 'perioder',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      },
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'type',
            message: 'Validation virksomhetsnummer error.',
            propertyPath: 'virksomhetsnummer',
            invalidValue: 'fom'
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ];

    const expected: Ansatt[] = [
      {
        fnr: '1',
        fom: 'fom',
        id: 1,
        oppdatert: 1,
        referenceNumber: '1234',
        status: 2,
        tom: 'tom'
      },
      {
        fnr: '2',
        fom: 'fom',
        id: 2,
        oppdatert: 2,
        status: 4,
        tom: 'tom'
      },
      {
        fnr: '3',
        fom: 'fom',
        id: 3,
        oppdatert: 3,
        status: 3,
        tom: 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  });

  it('should handle aa-reg errors', () => {
    const ansatte: Ansatt[] = [
      {
        id: 1,
        fnr: '1',
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      }
    ];

    const backendResponce: BackendStatus[] = [
      {
        status: BackendResponseState.VALIDATION_ERRORS,
        validationErrors: [
          {
            validationType: 'ArbeidsforholdConstraint',
            message:
              'Personen må ha et aktivt arbeidsforhold i virksomheten som er valgt',
            propertyPath: 'perioder',
            invalidValue: [
              {
                fom: '2021-12-01',
                tom: '2021-12-04',
                antallDagerMedRefusjon: 2,
                beloep: 2000.0
              }
            ]
          },
          {
            validationType: 'RefusjonsDagerConstraint',
            message:
              'Det kan ikke kreves refusjon for de 5 første dagene i arbeidsgiverperioden.',
            propertyPath: 'perioder',
            invalidValue: [
              {
                fom: '2021-12-01',
                tom: '2021-12-04',
                antallDagerMedRefusjon: 2,
                beloep: 2000.0
              }
            ]
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ];

    const expected: Ansatt[] = [
      {
        fnr: '1',
        fom: 'fom',
        id: 1,
        oppdatert: 1,
        periodeError:
          'Personen må ha et aktivt arbeidsforhold i virksomheten som er valgt. Det kan ikke kreves refusjon for de 5 første dagene i arbeidsgiverperioden.',
        status: 3,
        tom: 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  });
});
