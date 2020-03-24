import { Status, Ytelsesperiode } from "../store/types/helseSpionTypes";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";

export const mockYtelsesperiode1: Ytelsesperiode = 	{
	periode: {
		fom: new Date(2010,1,1),
		tom: new Date(2014,1,1),
	},
	refusjonsbeløp: 20,
	status: Status.INNVILGET,
	ytelse: 'SP',
	grad: 20,
	arbeidsforhold: {
		arbeidsforholdId: '1',
		arbeidstaker: {
			etternavn: 'etternavn',
			fornavn: 'fornavn',
			identitetsnummer: '1213123',
		},
		arbeidsgiver: {
			identitetsnummer: null,
			navn: 'navn',
			organisasjonsnummer: '123123',
			virksomhetsnummer: '12321',
		},
	},
	dagsats: 123,
	ferieperioder: [],
	maxdato: new Date(2015,10,10),
	sistEndret: new Date(2015,10,10),
	merknad: '',
	vedtaksId: '123',
};

export const mockYtelsesperiode2: Ytelsesperiode = {
	...mockYtelsesperiode1,
	periode: {
		fom: new Date(2012,1,1),
		tom: new Date(2016,1,1),
	},
	refusjonsbeløp: 10,
	status: Status.AVSLÅTT,
	ytelse: 'PP',
	grad: 100,
	merknad: 'Fritak AGP'
};

export const mockYtelsesperiode3: Ytelsesperiode = {
	...mockYtelsesperiode1,
	periode: {
		fom: new Date(2016,1,1),
		tom: new Date(2020,1,1),
	},
	refusjonsbeløp: 30,
	status: Status.UNDER_BEHANDLING,
	ytelse: 'FP',
	grad: 50,
	merknad: 'Mangler inntektsmld.'
};

export const mockYtelsesperioder: Ytelsesperiode[] = [
	mockYtelsesperiode1,
	mockYtelsesperiode2,
	mockYtelsesperiode3,
];

export const mockOrganisasjon1: Organisasjon = {
	Name: "ORG1",
	OrganizationForm: "BEDR",
	OrganizationNumber: "1",
	ParentOrganizationNumber: "0",
	Status: "Active",
	Type: "Enterprise",
};

export const mockOrganisasjon2: Organisasjon = {
	Name: "ORG2",
	OrganizationForm: "BEDR",
	OrganizationNumber: "2",
	ParentOrganizationNumber: "1",
	Status: "Active",
	Type: "Business",
};

export const mockOrganisasjon3: Organisasjon = {
	Name: "ORG3",
	OrganizationForm: "BEDR",
	OrganizationNumber: "3",
	ParentOrganizationNumber: "0",
	Status: "Active",
	Type: "Enterprise",
};

export const mockOrganisasjon4: Organisasjon = {
	Name: "ORG4",
	OrganizationForm: "BEDR",
	OrganizationNumber: "4",
	ParentOrganizationNumber: "0",
	Status: "Active",
	Type: "Business",
};

export const mockOrganisasjoner: Organisasjon[] = [
	mockOrganisasjon1,
	mockOrganisasjon2,
	mockOrganisasjon3,
	mockOrganisasjon4,
];
