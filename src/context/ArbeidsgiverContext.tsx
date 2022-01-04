import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC
} from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import ArbeidsgiverAPI, { Status } from '../api/ArbeidsgiverAPI';
import Spinner from 'nav-frontend-spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import env from '../components/felles/environment';

export const buildArbeidsgiverContext = (
  firma: string,
  arbeidsgiverId: string,
  arbeidsgivere: Organisasjon[],
  setArbeidsgivere?: (arbeidsgivere: Organisasjon[]) => void,
  setFirma?: (firma: string) => void,
  setArbeidsgiverId?: (arbeidsgiverId: string) => void
) => ({
  arbeidsgivere,
  setArbeidsgivere,
  firma,
  setFirma,
  arbeidsgiverId,
  setArbeidsgiverId
});

export const buildArbeidsgiver = (
  Name: string,
  OrganizationForm: string,
  OrganizationNumber: string,
  ParentOrganizationNumber: string,
  Status: string,
  Type: string
): Organisasjon => {
  return {
    Name,
    OrganizationForm,
    OrganizationNumber,
    ParentOrganizationNumber,
    Status,
    Type
  };
};

const ArbeidsgiverContext = createContext(buildArbeidsgiverContext('', '', []));

interface ArbeidsgiverContextProviderProps {
  defaultStatus?: number;
  defaultArbeidsgivere?: Organisasjon[];
}

export const useArbeidsgiver = () => useContext(ArbeidsgiverContext);

export const ArbeidsgiverProvider: FC<ArbeidsgiverContextProviderProps> = ({
  defaultStatus,
  defaultArbeidsgivere,
  children
}) => {
  const [status, setStatus] = useState<number>(
    defaultStatus || Status.NotStarted
  );
  const [arbeidsgivere, setArbeidsgivere] = useState<Organisasjon[]>(
    defaultArbeidsgivere || []
  );
  const [firma, setFirma] = useState<string>('');
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');

  useEffect(() => {
    if (status === Status.NotStarted) {
      setStatus(Status.Started);
      ArbeidsgiverAPI.GetArbeidsgivere().then((res) => {
        setStatus(res.status);
        setArbeidsgivere(res.organisasjoner);
      });
    }
  }, [status]);

  if (status === Status.Unauthorized) {
    window.location.href = env.loginServiceUrl;
    return <div className='arbeidsgiver-provider-redirect' />;
  }

  if (status === Status.NotStarted || status === Status.Started) {
    return <Spinner type={'XXL'} className='sporenstreks-spinner' />;
  }

  if (status === Status.Error || status === Status.Timeout) {
    return (
      <AlertStripeFeil>
        Vi får akkurat nå ikke hentet alle data. Vi jobber med å løse saken.
        Vennligst prøv igjen senere.
      </AlertStripeFeil>
    );
  }

  if (status === Status.Unknown) {
    return (
      <AlertStripeFeil>
        Det oppstod en ukjent feil. Vi jobber med å løse saken. Vennligst prøv
        igjen senere.
      </AlertStripeFeil>
    );
  }

  return (
    <ArbeidsgiverContext.Provider
      value={{
        arbeidsgivere,
        setArbeidsgivere,
        firma,
        setFirma,
        arbeidsgiverId,
        setArbeidsgiverId
      }}
    >
      {children}
    </ArbeidsgiverContext.Provider>
  );
};
