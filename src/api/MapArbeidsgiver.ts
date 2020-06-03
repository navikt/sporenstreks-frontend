import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

 const MapArbeidsgiver = (data): Organisasjon[] => data.map(organisasjon => ({
  Name: organisasjon.name,
  Type: organisasjon.type,
  OrganizationNumber: organisasjon.organizationNumber,
  OrganizationForm: organisasjon.organizationForm,
  Status: organisasjon.status,
  ParentOrganizationNumber: organisasjon.parentOrganizationNumber
}));

export default MapArbeidsgiver;
