import { BackendStatus } from '../../data/types/sporenstreksTypes';

export const backendStatus: BackendStatus[] = [
  {
    status: "OK",
    validationErrors: null,
    genericMessage: null,
    referenceNumber: "452229"
  },
  {
    status: "GENERIC_ERROR",
    validationErrors: null,
    genericMessage: "Ingen tilgang til virksomheten",
    referenceNumber: null
  },
  {
    status: "VALIDATION_ERRORS",
    validationErrors: [
      {
        validationType: "IdentitetsnummerConstraint",
        message: "Ugyldig fødsels- eller D-nummer",
        propertyPath: "identitetsnummer",
        invalidValue: "1234567"
      },
      {
        validationType: "GreaterOrEqual",
        message: "Refusjonsbeløpet må være et posisivt tall eller null",
        propertyPath: "perioder[0].beloep",
        invalidValue: -2.0
      }
    ],
    genericMessage: null,
    referenceNumber: null
  }
];
