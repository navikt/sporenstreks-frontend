const options: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	year: 'numeric',
	month: '2-digit',
};

export const dateToString = (date: Date): string => date.toLocaleDateString('fr-CA', options);
