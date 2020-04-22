import uuid from 'uuid/v4';

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
}

export interface AnsattID {
  id: number
}

export interface Ansatt extends AnsattID {
  fnr: string;
  fnrError?: string,
  beloepError?: string,
  refusjonError?: string,
  periodeError?: string,
  dagerError?: string,
  fom: string;
  tom: string;
  antallDagerMedRefusjon?: number;
  beloep?: number;
  status: SkjemaStatus;
  oppdatert: number;
  referenceNumber?: string | null;
}

export const byggAnsatt = () => {
  let a = {} as Ansatt;
  a.id = uuid();
  a.fnr = '';
  a.fom = '';
  a.tom = '';
  a.antallDagerMedRefusjon = undefined;
  a.beloep = undefined;
  a.status = SkjemaStatus.NY;
  a.oppdatert = 0;
  return a;
};

export interface BackendStatus {
  status: 'OK' | 'GENERIC_ERROR' | 'VALIDATION_ERRORS';
  validationErrors: BackendValidation[] | null;
  genericMessage: string | null;
  referenceNumber: string | null;
}

export interface BackendValidation {
  validationType: string;
  message: string;
  propertyPath: string;
  invalidValue: string | number;
}

export enum ErrorType {
  NOTNULL = 'NOTNULL',
  IDENTITETSNUMMERCONSTRAINT = 'IDENTITETSNUMMERCONSTRAINT',
  ORGANISASJONSNUMMERCONSTRAINT = 'ORGANISASJONSNUMMERCONSTRAINT',
  // GREATEROREQUAL = 'GREATEROREQUAL', // Todo: unused untill search on dates is implemented
  UNKNOWN = 'UNKNOWN',
  TOOLOWAMOUNT = 'TOOLOWAMOUNT',
  TOOHIGHAMOUNT = 'TOOHIGHAMOUNT',
}

export enum Status {
  UNDER_BEHANDLING = 'UNDER BEHANDLING',
  AVSLÅTT = 'AVSLÅTT',
  INNVILGET = 'INNVILGET',
  HENLAGT = 'HENLAGT',
}

export interface UnleashToggles {
  [index: string]: boolean;
}
