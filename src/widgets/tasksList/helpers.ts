import { parseISO, format } from "date-fns";


export const formatDate = (date: string) => {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'dd LLLL yyyy - HH:mm');
}
