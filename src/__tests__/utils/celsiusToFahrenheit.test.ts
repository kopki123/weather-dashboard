import { celsiusToFahrenheit } from '../../utils/celsiusToFahrenheit';

describe('攝氏轉華氏函式', () => {
  it('將 0°C 轉換成 32°F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it('將 25°C 轉換成約 77°F', () => {
    expect(celsiusToFahrenheit(25)).toBeCloseTo(77, 0);
  });

  it('將 -10°C 轉換成約 14°F', () => {
    expect(celsiusToFahrenheit(-10)).toBeCloseTo(14, 0);
  });
});