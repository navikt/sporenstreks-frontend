export interface RefusjonsKrav {
  identitetsnummer: string;
  virksomhetsnummer: string;
  perioder: Periode[];
}

export interface Periode {
  fom: string;
  tom: string;
  antallDagerMedRefusjon: number;
  beloep: number;
}

export const tomPeriode: Periode = {
  fom: '',
  tom: '',
  antallDagerMedRefusjon: 0,
  beloep: 0
};

export enum SkjemaStatus {
  'NY',
  'AVVENTER',
  'GODKJENT',
  'VALIDERINGSFEIL',
  'ERRORBACKEND',
  'GENERIC_ERROR_BACKEND'
}

export enum BackendResponseState {
  'OK' = 'OK',
  'GENERIC_ERROR' = 'GENERIC_ERROR',
  'VALIDATION_ERRORS' = 'VALIDATION_ERRORS'
}

export interface BackendStatus {
  status: BackendResponseState;
  validationErrors: BackendValidation[] | null;
  genericMessage: string | null;
  referenceNumber: string | null;
}

export interface BackendValidation {
  validationType: string;
  message: string;
  propertyPath: string;
  invalidValue: string | number | object;
}

export enum ErrorType {
  NOTNULL = 'NOTNULL',
  IDENTITETSNUMMERCONSTRAINT = 'IDENTITETSNUMMERCONSTRAINT',
  ORGANISASJONSNUMMERCONSTRAINT = 'ORGANISASJONSNUMMERCONSTRAINT',
  // GREATEROREQUAL = 'GREATEROREQUAL', // Todo: unused untill search on dates is implemented
  UNKNOWN = 'UNKNOWN',
  TOOLOWAMOUNT = 'TOOLOWAMOUNT',
  TOOHIGHAMOUNT = 'TOOHIGHAMOUNT',
  MISSINGAMOUNT = 'MISSINGAMOUNT'
}

export enum Status {
  UNDER_BEHANDLING = 'UNDER BEHANDLING',
  AVSLÅTT = 'AVSLÅTT',
  INNVILGET = 'INNVILGET',
  HENLAGT = 'HENLAGT'
}

export interface UnleashToggles {
  [index: string]: boolean;
}
