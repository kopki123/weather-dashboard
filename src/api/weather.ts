import axiosInstance from './axiosInstance';

export interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  time: string;
}

export type DailyForecast = {
  time: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
}[];

/**
 * 根據城市名稱取得該城市的地理資訊（例如經緯度、城市名稱、國家）。
 * 若找不到符合的結果，則回傳 null。
 *
 * @param city - 要查詢的城市名稱
 * @returns Promise<LocationData | null>
 */
export const getLocationData = async (city: string): Promise<LocationData | null> => {
  try {
    const response = await axiosInstance.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: city,
      }
    });

    if (!response.data.results && response.data.results.length < 1) {
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
  } catch (error) {
    console.error('取得地理資訊時發生錯誤:', error);
    return null;
  }
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
} | null> => {
  try {
    const response = await axiosInstance.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
        forecast_days: 5
      }
    });

    const { current, daily } = response.data;
    const {
      temperature_2m: temperature,
      relative_humidity_2m: humidity,
      weather_code: weatherCode,
      wind_speed_10m: windSpeed,
      time
    } = current;

    const dailyForecast = daily.time.map((time: unknown, index: number) => {
      return {
        time,
        weatherCode: daily.weather_code[index],
        maxTemperature: daily.temperature_2m_max[index],
        minTemperature: daily.temperature_2m_min[index],
      };
    });

    return {
      dailyForecast,
      currentWeather: {
        temperature,
        humidity,
        weatherCode,
        windSpeed,
        time,
      },
    };
  } catch (error) {
    console.error('取得天氣資訊時發生錯誤:', error);
    return null;
  }
};
