import BackendOrganisasjon from './BackendOrganisasjon';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export const mapArbeidsgiver = (
  backendData: BackendOrganisasjon[]
): Organisasjon[] =>
  backendData.map(
    (backendOrganisasjon): Organisasjon => ({
      Name: backendOrganisasjon.name,
      Type: backendOrganisasjon.type,
      OrganizationNumber: backendOrganisasjon.organizationNumber,
      OrganizationForm: backendOrganisasjon.organizationForm,
      Status: backendOrganisasjon.status,
      ParentOrganizationNumber:
        backendOrganisasjon.parentOrganizationNumber || ''
    })
  );

export default mapArbeidsgiver;
