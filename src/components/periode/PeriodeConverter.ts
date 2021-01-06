import dayjs from 'dayjs';

export const PeriodeConverter = (date?: Date) =>
  date ? dayjs(date).format('YYYY-MM-DD') : undefined;
