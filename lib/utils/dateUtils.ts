import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const getDiffOfNow = (date: Date | string) => {
  let d: Date;
  if (typeof date === 'string') {
    d = new Date(date);
  } else {
    d = date;
  }
  const now = Date.now();
  const diff = now - d.getTime();

  if (diff < 1000 * 60 * 5) {
    return 'Recently';
  }

  if (diff < 1000 * 60 * 60 * 24) {
    return formatDistanceToNow(d, { addSuffix: true });
  }

  return d.toLocaleDateString();
};

export const stringToDateLocalString = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const stringToDateMoreDetail = (date: string) => {
  const d = new Date(date);
  return format(d, 'yyyy.MM.dd');
};
