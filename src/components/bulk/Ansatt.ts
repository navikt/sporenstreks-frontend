import { v4 as uuidv4 } from 'uuid';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';

export interface AnsattID {
  id: number | string;
}

export interface Ansatt extends AnsattID {
  fnr?: string;
  fnrError?: string;
  beloepError?: string;
  refusjonError?: string;
  periodeError?: string;
  dagerError?: string;
  fom: string;
  tom: string;
  antallDagerMedRefusjon?: number;
  beloep?: number;
  status: SkjemaStatus;
  oppdatert: number;
  referenceNumber?: string | null;
}

export const byggAnsatt = (): Ansatt => {
  let a = {} as Ansatt;
  a.id = uuidv4();
  a.fnr = '';
  a.fom = '';
  a.tom = '';
  a.antallDagerMedRefusjon = undefined;
  a.beloep = undefined;
  a.status = SkjemaStatus.NY;
  a.oppdatert = 0;
  return a;
};
