type DateMode = 'subtract' | 'add';

export const getFormattedDate = (date: Date, format: string): string => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  let formattedDate = format.replace('YYYY', year);
  formattedDate = formattedDate.replace('MM', month);
  formattedDate = formattedDate.replace('DD', day);

  return formattedDate;
};

export const convertStringToFormattedDate = (dateString: string): string | null => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  const hour = dateString.slice(8, 10);
  const minute = dateString.slice(10, 12);
  const second = dateString.slice(12, 14);

  if (
    year.length !== 4 ||
    month.length !== 2 ||
    day.length !== 2 ||
    hour.length !== 2 ||
    minute.length !== 2 ||
    second.length !== 2
  ) {
    return null;
  }

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  return formattedDate;
};

export const getYear = (mode?: DateMode, subtractOrAdd?: number): Date => {
  const date = new Date();

  if (mode === 'subtract' && subtractOrAdd) {
    date.setFullYear(date.getFullYear() - subtractOrAdd);
  } else if (mode === 'add' && subtractOrAdd) {
    date.setFullYear(date.getFullYear() + subtractOrAdd);
  }

  return date;
};
