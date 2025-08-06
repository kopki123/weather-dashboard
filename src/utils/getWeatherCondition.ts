import weatherCode from './weatherCode.json';

/**
 * 取得天氣狀況描述、圖片
 * @param code - 天氣狀態碼
 * @returns 天氣狀況描述、圖片
 */
export default function getWeatherCondition(code: number): {
  description: string,
  image: string
} {
  const { day } = weatherCode[code as unknown as keyof typeof weatherCode];
  const { description, image } = day;

  return {
    description,
    image
  };
}
