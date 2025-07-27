const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];


/**
 * 取得指定日期的星期名稱
 * @param date - 要取得星期名稱的日期物件
 * @returns 代表星期的字串
 */
const getWeekdayName = (date: Date): string => {
  return weekdays[date.getDay()];
};

export default getWeekdayName;