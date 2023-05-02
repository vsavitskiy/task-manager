import {format, parseISO} from "date-fns";

export const formatTaskDuration = (startsAt: string, dueAt: string) => {
  const parsedStartDate = parseISO(startsAt);
  const parsedDueDate = parseISO(dueAt);

  return `${format(parsedStartDate, 'PPPP')} ⋅ 
  ${format(parsedStartDate, 'K:mm')} – 
  ${format(parsedDueDate, 'K:mm bbb')}`
}
