import berikAnsatte from './berikAnsatte';
import { BackendStatus, Ansatt } from '../../data/types/sporenstreksTypes';

describe('berikAnsatte', () => {
  it('should add validation errors', () => {
    const ansatte: Ansatt[] = [{
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
        status: 'OK',
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: 'VALIDATION_ERRORS',
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
        status: 'VALIDATION_ERRORS',
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
      },
    ]

    const expected: Ansatt[] = [
      {
        'fnr': '1',
        'fom': 'fom',
        'id': 1,
        'oppdatert': 1,
        'referenceNumber': '1234',
        'status': 2,
        'tom': 'tom'
      },
      {
        'fnr': '2',
        'fom': 'fom',
        'id': 2,
        'oppdatert': 2,
        'periodeError': 'Validation periode error.',
        'status': 3,
        'tom': 'tom'
      },
      {
        'fnr': '3',
        'fnrError': 'Validation identitetsnummer error.',
        'fom': 'fom',
        'id': 3,
        'oppdatert': 3,
        'status': 3,
        'tom': 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  })

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
        status: 'OK',
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: 'VALIDATION_ERRORS',
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
        status: 'VALIDATION_ERRORS',
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
      },
    ]

    const expected: Ansatt[] = [
      {
        'fnr': '1',
        'fom': 'fom',
        'id': 1,
        'oppdatert': 1,
        'referenceNumber': '1234',
        'status': 2,
        'tom': 'tom'
      },
      {
        'fnr': '2',
        'fom': 'fom',
        'id': 2,
        'oppdatert': 2,
        'periodeError': 'Validation periode error. Validation generic periode error.',
        'status': 3,
        'tom': 'tom'
      },
      {
        'fnr': '3',
        'fnrError': 'Validation identitetsnummer error.',
        'fom': 'fom',
        'id': 3,
        'oppdatert': 3,
        'status': 3,
        'tom': 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  })

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
        status: 'OK',
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: 'GENERIC_ERROR',
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
        status: 'VALIDATION_ERRORS',
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
      },
    ]

    const expected: Ansatt[] = [
      {
        'fnr': '1',
        'fom': 'fom',
        'id': 1,
        'oppdatert': 1,
        'referenceNumber': '1234',
        'status': 2,
        'tom': 'tom'
      },
      {
        'fnr': '2',
        'fom': 'fom',
        'id': 2,
        'oppdatert': 2,
        'status': 4,
        'tom': 'tom'
      },
      {
        'fnr': '3',
        'fnrError': 'Validation identitetsnummer error.',
        'fom': 'fom',
        'id': 3,
        'oppdatert': 3,
        'status': 3,
        'tom': 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  })

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
        status: 'OK',
        validationErrors: null,
        genericMessage: null,
        referenceNumber: '1234'
      },
      {
        status: 'GENERIC_ERROR',
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
        status: 'VALIDATION_ERRORS',
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
      },
    ]

    const expected: Ansatt[] = [
      {
        'fnr': '1',
        'fom': 'fom',
        'id': 1,
        'oppdatert': 1,
        'referenceNumber': '1234',
        'status': 2,
        'tom': 'tom'
      },
      {
        'fnr': '2',
        'fom': 'fom',
        'id': 2,
        'oppdatert': 2,
        'status': 4,
        'tom': 'tom'
      },
      {
        'fnr': '3',
        'fom': 'fom',
        'id': 3,
        'oppdatert': 3,
        'status': 3,
        'tom': 'tom'
      }
    ];

    expect(berikAnsatte(ansatte, backendResponce)).toEqual(expected);
  })
})
