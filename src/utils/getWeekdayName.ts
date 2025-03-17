const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

/**
 * 取得指定日期的星期名稱
 * @param date - 要取得星期名稱的日期物件
 * @returns 代表星期的字串，例如星期日會回傳 "週日"
 */
const getWeekdayName = (date: Date): string => {
  return `週${weekdays[date.getDay()]}`;
};

export default getWeekdayName;