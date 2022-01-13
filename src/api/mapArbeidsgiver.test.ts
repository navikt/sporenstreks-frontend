import mapArbeidsgiver from './mapArbeidsgiver';
import arbeidsgivere from '../../tests/mocks/arbeidsgivere';
import testOrganisasjoner from '../../mock/testOrganisasjoner';

describe('mapArbeidsgiver', () => {
  it('should map backend data to something useable', () => {
    expect(mapArbeidsgiver(arbeidsgivere)).toEqual(testOrganisasjoner);
  });
});
