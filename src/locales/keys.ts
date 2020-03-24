import { ErrorType, Status } from "../store/types/helseSpionTypes";

export enum Keys {
	MY_PAGE = 'MY_PAGE',
	DOCUMENT_TITLE = 'DOCUMENT_TITLE',
	REFUNDS = 'REFUNDS',
	ALL_REFUNDS = 'ALL_REFUNDS',
	CHANGE = 'CHANGE',
	FIND_OTHER_EMPLOYEE = 'FIND_OTHER_EMPLOYEE',
	IDENTITY_NUMBER = 'IDENTITY_NUMBER',
	IDENTITY_NUMBER_EXT = 'IDENTITY_NUMBER_EXT',
	SEARCH = 'SEARCH',
	PERIOD = 'PERIOD',
	TOTAL_REFUNDED = 'TOTAL_REFUNDED',
	STATUS = 'STATUS',
	BENEFIT = 'BENEFIT',
	GRADE = 'GRADE',
	MARK = 'MARK',
	REFUND = 'REFUND',
	NEXT = 'NEXT',
	PREVIOUS = 'PREVIOUS',
}

const translatedKeys: IncludedKeys = {
	[Keys.MY_PAGE]: {
		nb: 'Min side - refusjoner',
		nn: 'Mi side - refusjonar',
		en: 'My page - refunds',
	},
	
	[Keys.DOCUMENT_TITLE]: {
		nb: 'Min side arbeidsgiver',
		nn: 'Mi side arbeidsgivar',
		en: 'My page employer',
	},
	
	[Keys.REFUNDS]: {
		nb: 'Refusjoner',
		nn: 'Refusjonar',
		en: 'Refunds',
	},
	
	[Keys.ALL_REFUNDS]: {
		nb: 'Alle refusjoner',
		nn: 'Alle refusjonar',
		en: 'All refunds',
	},
	
	[Keys.CHANGE]: {
		nb: 'Endre',
		nn: 'Endre',
		en: 'Change',
	},
	
	[Keys.FIND_OTHER_EMPLOYEE]: {
		nb: 'Finn annen ansatt',
		nn: 'Finn annan tilsett',
		en: 'Find another employee',
	},
	
	[Keys.IDENTITY_NUMBER]: {
		nb: 'Fødselsnummer',
		nn: 'Fødselsnummer',
		en: 'Identity number',
	},
	
	[Keys.IDENTITY_NUMBER_EXT]: {
		nb: 'Fødselsnummer 11 siffer',
		nn: 'Fødselsnummer 11 siffer',
		en: 'Identity number 11 numbers',
	},
	
	[Keys.SEARCH]: {
		nb: 'SØK',
		nn: 'SØK',
		en: 'SEARCH',
	},
	
	[Keys.PERIOD]: {
		nb: 'Periode',
		nn: 'Periode',
		en: 'Period',
	},
	
	[Keys.TOTAL_REFUNDED]: {
		nb: 'Total refundert',
		nn: 'Total refundert',
		en: 'Total refunded',
	},
	
	[Keys.STATUS]: {
		nb: 'Status',
		nn: 'Status',
		en: 'Status',
	},
	
	[Keys.BENEFIT]: {
		nb: 'Ytelse',
		nn: 'Yting',
		en: 'Benefit',
	},
	
	[Keys.GRADE]: {
		nb: 'Grad',
		nn: 'Grad',
		en: 'Grade',
	},
	
	[Keys.MARK]: {
		nb: 'Merknad',
		nn: 'Merknad',
		en: 'Mark',
	},
	
	[Keys.REFUND]: {
		nb: 'Refusjon',
		nn: 'Refusjon',
		en: 'Refund',
	},
	
	[Keys.NEXT]: {
		nb: 'neste',
		nn: 'neste',
		en: 'next',
	},
	
	[Keys.PREVIOUS]: {
		nb: 'forrige',
		nn: 'førre',
		en: 'previous',
	},
};

const translatedStatus: IncludedStatus = {
	[Status.INNVILGET]: {
		nb: 'Innvilget',
		nn: 'Innvilga',
		en: 'Approved',
	},
	
	[Status.AVSLÅTT]: {
		nb: 'Avslått',
		nn: 'Avslått',
		en: 'Declined',
	},
	
	[Status.UNDER_BEHANDLING]: {
		nb: 'Under behandling',
		nn: 'Under behandling',
		en: 'Declined',
	},
	
	[Status.HENLAGT]: {
		nb: 'Henlagt',
		nn: 'Henlagt',
		en: 'Archived',
	},
};

// Todo: proper texts
const translatedErrors: IncludedErrors = {
	[ErrorType.NOTNULL]: {
		nb: 'En feil har skjedd. Prøv igjen senere.',
		nn: 'Ein feil har skjedd. Prøv igjen seinare',
		en: 'An error occurred. Try again later.',
	},
	
	[ErrorType.IDENTITETSNUMMERCONSTRAINT]: {
		nb: 'En feil har skjedd. Prøv igjen senere.',
		nn: 'Ein feil har skjedd. Prøv igjen seinare',
		en: 'An error occurred. Try again later.',
	},
	
	[ErrorType.ORGANISASJONSNUMMERCONSTRAINT]: {
		nb: 'En feil har skjedd. Prøv igjen senere.',
		nn: 'Ein feil har skjedd. Prøv igjen seinare',
		en: 'An error occurred. Try again later.',
	},
	
	[ErrorType.UNKNOWN]: {
		nb: 'En feil har skjedd. Prøv igjen senere.',
		nn: 'Ein feil har skjedd. Prøv igjen seinare',
		en: 'An error occurred. Try again later.',
	},
};

type IncludedKeys = {
	[P in Keys]: {
		[P in Languages]: string
	}
}

type IncludedStatus = {
	[P in Status]: {
		[P in Languages]: string
	}
}

type IncludedErrors = {
	[P in ErrorType]: {
		[P in Languages]: string
	}
}

const allTranslations: IncludedKeys & IncludedStatus & IncludedErrors = {
	...translatedKeys, ...translatedStatus, ...translatedErrors
};

export enum Languages {
	nb = 'nb',
	nn = 'nn',
	en = 'en',
}

export const translationsToJson = (lan: Languages): {} => {
	let translatedKeys = {};
	Object.keys(allTranslations).map(e => translatedKeys[e] = allTranslations[e][lan]);
	return translatedKeys;
};
