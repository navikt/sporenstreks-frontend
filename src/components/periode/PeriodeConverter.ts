import dayjs from "dayjs";

export const PeriodeConverter = (date?: Date) => {
  if (!date){
    return;
  }
  return dayjs(date).format('YYYY-MM-DD')
}
