export const stringToDate = (str: string): Date => {
	const values: number[] = str.split('-').map(str => parseInt(str));
	return new Date(values[0],values[1]-1,values[2]);
};
