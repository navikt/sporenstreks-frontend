import dayjs from "dayjs";

export const PeriodeConverter = (date?: Date) => date ? undefined : dayjs(date).format('YYYY-MM-DD');
