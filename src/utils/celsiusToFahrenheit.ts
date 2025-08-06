/**
 * 將攝氏溫度轉換為華氏溫度
 * @param celsius - 攝氏溫度
 * @returns 華氏溫度
 */
export default function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}