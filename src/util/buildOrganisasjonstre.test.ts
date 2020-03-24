import { buildOrganisasjonstre } from "./buildOrganisasjonstre";
import { mockOrganisasjon1, mockOrganisasjon2, mockOrganisasjoner } from "./mockData";

describe('buildOrganisasjonstre', () => {
	it('builds tree and filters', () => {
		const input = buildOrganisasjonstre(mockOrganisasjoner);
		expect(input).toEqual([{JuridiskEnhet: mockOrganisasjon1, Underenheter: [mockOrganisasjon2]}]);
	});
});
