const options: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	year: '2-digit',
	month: '2-digit',
};

export const dateToString = (date: Date): string => date.toLocaleDateString('nb', options);
