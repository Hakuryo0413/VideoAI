import { parse, format } from "date-fns";

export const parseDate = (date: string): string => {
  const parsedDatetime = parse(date, "yyyy-MM-dd HH:mm:ss.SSSSSS", new Date());
  return format(parsedDatetime, "yyyy/dd/MM HH/mm/ss");
};
