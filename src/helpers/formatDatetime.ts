import { format } from 'date-fns';

type FormatDatetime = (date: Date) => string;

const formatDatetime: FormatDatetime = (date) => {
  return format(date, 'yyyy/MM/dd HH:mm');
};

export default formatDatetime;
