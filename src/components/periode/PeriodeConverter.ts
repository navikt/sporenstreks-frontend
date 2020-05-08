import dayjs from "dayjs";

export const PeriodeConverter = (date?: Date) => date ? dayjs(date).format('DD-MM-YYYY') : undefined;
