import getWeatherCondition from '../../utils/getWeatherCondition';

describe('getWeatherCondition 函式', () => {
  it('處理天氣狀態碼 0', () => {
    const result = getWeatherCondition(0);

    expect(result).toEqual({
      description: 'Sunny',
      image: 'http://openweathermap.org/img/wn/01d@2x.png'
    });
  });

  it('應該正確處理天氣狀態碼 2', () => {
    const result = getWeatherCondition(2);

    expect(result).toEqual({
      description: 'Partly Cloudy',
      image: 'http://openweathermap.org/img/wn/02d@2x.png'
    });
  });

  it('處理天氣狀態碼 3', () => {
    const result = getWeatherCondition(3);

    expect(result).toEqual({
      description: 'Cloudy',
      image: 'http://openweathermap.org/img/wn/03d@2x.png'
    });
  });

  it('處理天氣狀態碼 61', () => {
    const result = getWeatherCondition(61);

    expect(result).toEqual({
      description: 'Light Rain',
      image: 'http://openweathermap.org/img/wn/10d@2x.png'
    });
  });

  it('傳入不存在的天氣狀態碼應該拋出錯誤', () => {
    expect(() => getWeatherCondition(100)).toThrow();
  });
});
