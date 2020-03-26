import { Status } from '../store/types/sporenstreksTypes';

export const getClassnameFromStatus = (status: Status): string => {
	switch (status) {
		case Status.UNDER_BEHANDLING: return 'under-behandling';
		case Status.AVSLÅTT: return 'avslått';
		case Status.INNVILGET: return 'innvilget';
		default: return '';
	}
};
