import axiosInstance from './axiosInstance';

export interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  time: string;
  weatherCode: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitationProbability: number;
}

export type DailyForecast = {
  time: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
}[];

export type HourlyForecast = {
  time: string;
  weatherCode: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitationProbability: number;
}[];

/**
 * 根據城市名稱取得該城市的地理資訊（例如經緯度、城市名稱、國家）。
 * 若找不到符合的結果，則回傳 null。
 *
 * @param city - 要查詢的城市名稱
 * @returns Promise<LocationData | null>
 */
export const getLocationData = async (city: string): Promise<LocationData | null> => {
  const response = await axiosInstance.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: {
      name: city,
    }
  });

  if (!response.data.results || response.data.results.length < 1) {
    return null;
  }

  const {
    name,
    country,
    latitude,
    longitude,
  } = response.data.results[0];

  return {
    name,
    country,
    latitude,
    longitude,
  };
};

/**
 * 根據給定的經緯度取得天氣資訊，包括目前天氣與每日預報資料。
 *
 * @param latitude - 緯度
 * @param longitude - 經度
 * @returns Promise<{ currentWeather: CurrentWeatherData; dailyForecast: DailyForecast } | null>
 */
export const getWeatherData = async (latitude: number, longitude: number): Promise<{
  currentWeather: CurrentWeatherData;
  dailyForecast: DailyForecast;
  hourlyForecast: HourlyForecast;
} | null> => {
  const response = await axiosInstance.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude,
      longitude,
      hourly: 'relative_humidity_2m,wind_speed_10m,temperature_2m,wind_direction_10m,weather_code,precipitation_probability',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      forecast_days: 8,
    }
  });

  const {
    daily,
    hourly,
  } = response.data;

  const currentTimestamp = Date.now();
  const nextHourlyTimeIndex = (hourly.time as string[]).findIndex((time: string) => (new Date(time).getTime()) - currentTimestamp > 0);
  const currentHourlyTimeIndex = nextHourlyTimeIndex - 1;

  const currentWeather = {
    time: hourly.time[currentHourlyTimeIndex],
    weatherCode: hourly.weather_code[currentHourlyTimeIndex],
    temperature: hourly.temperature_2m[currentHourlyTimeIndex],
    humidity: hourly.relative_humidity_2m[currentHourlyTimeIndex],
    windSpeed: hourly.wind_speed_10m[currentHourlyTimeIndex],
    windDirection: hourly.wind_direction_10m[currentHourlyTimeIndex],
    precipitationProbability: hourly.precipitation_probability[currentHourlyTimeIndex],
  };

  const hourlyForecast = hourly.time
    .slice(currentHourlyTimeIndex)
    .filter((_item: unknown, index: number) => index % 3 === 0)
    .map((time: unknown, index: number) => {
      return {
        time,
        weatherCode: hourly.weather_code[index],
        temperature: hourly.temperature_2m[index],
        humidity: hourly.relative_humidity_2m[index],
        windSpeed: hourly.wind_speed_10m[index],
        windDirection: hourly.wind_direction_10m[index],
        precipitationProbability: hourly.precipitation_probability[index],
      };
    });

  const dailyForecast = daily.time.map((time: unknown, index: number) => {
    return {
      time,
      weatherCode: daily.weather_code[index],
      maxTemperature: daily.temperature_2m_max[index],
      minTemperature: daily.temperature_2m_min[index],
    };
  });

  return {
    currentWeather,
    hourlyForecast,
    dailyForecast,
  };
};
