import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon'
import { convertResponseDataToOrganisasjon } from './convertResponse'

describe('convertResponseDataToOrganisasjon', () => {
  it('should convert the response', () => {
    const input = [{
      name: 'Name',
      type: 'Type',
      organizationNumber: '1234',
      organizationForm: 'Form',
      status: 'Status',
      parentOrganizationNumber: '5678',
      someExtraData: 'Testdata'
    }]

    const expected : Organisasjon[] = [{
      Name: 'Name',
      Type: 'Type',
      OrganizationNumber: '1234',
      OrganizationForm: 'Form',
      Status: 'Status',
      ParentOrganizationNumber: '5678'
    }]

    expect(convertResponseDataToOrganisasjon(input)).toEqual(expected)
  })
})
