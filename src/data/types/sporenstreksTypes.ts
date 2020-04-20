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

export interface Ansatt {
  id: number,
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

export const tomAnsatt: Ansatt = {
  id: Math.random()*100000 * new Date().getTime(),
  fnr: '',
  fom: '',
  tom: '',
  antallDagerMedRefusjon: 0,
  beloep: 0,
  status: SkjemaStatus.NY,
  oppdatert: 0
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

export enum OrganisationType {
  ENTERPRISE = 'Enterprise',
  BUSINESS = 'Business',
  PERSON = 'Person',
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

export interface ErrorObject {
  fieldName?: string;
  errorType: ErrorType;
  errorMessage: string;
}

export interface Ytelsesperiode {
  arbeidsforhold: Arbeidsforhold;
  dagsats: number;
  ferieperioder: Periode[];
  grad?: number;
  maxdato: Date;
  merknad: string;
  periode: Periode;
  refusjonsbeløp?: number;
  sistEndret: Date;
  status: Status;
  vedtaksId: string;
  ytelse: string;
}

export interface Arbeidsforhold {
  arbeidsforholdId: string;
  arbeidsgiver: YtelsesperioderArbeidsgiver;
  arbeidstaker: Arbeidstaker;
}

// fra Ytelsesperioder API
export interface YtelsesperioderArbeidsgiver {
  identitetsnummer: null;
  navn: string;
  organisasjonsnummer: string;
  virksomhetsnummer: string;
}

export interface Arbeidstaker {
  etternavn: string;
  fornavn: string;
  identitetsnummer: string;
}

export enum Status {
  UNDER_BEHANDLING = 'UNDER BEHANDLING',
  AVSLÅTT = 'AVSLÅTT',
  INNVILGET = 'INNVILGET',
  HENLAGT = 'HENLAGT',
}

export enum SporenstreksTypes {
  FETCH_ARBEIDSGIVERE_STARTED = 'FETCH_ARBEIDSGIVERE_STARTED',
  FETCH_ARBEIDSGIVERE_SUCCESS = 'FETCH_ARBEIDSGIVERE_SUCCESS',
  FETCH_ARBEIDSGIVERE_ERROR = 'FETCH_ARBEIDSGIVERE_ERROR',
  SUBMIT_REFUSJON_STARTED = 'FETCH_PERSON_STARTED',
  SUBMIT_REFUSJON_SUCCESS = 'FETCH_PERSON_SUCCESS',
  SUBMIT_REFUSJON_ERROR = 'FETCH_PERSON_ERROR',
}

export interface UnleashToggles {
  [index: string]: boolean;
}
