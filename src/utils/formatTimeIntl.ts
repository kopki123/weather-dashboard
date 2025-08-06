/**
 * 格式化時間為國際化的字串
 * @param dateString - 要格式化的日期字串或日期物件
 * @param locale - 使用的語言環境，預設為 'en-US'
 * @returns 格式化後的時間字串
 */
export default function formatTimeIntl(dateString: string, locale = 'en-US') {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return formatter.format(date);
}
