import React, { useEffect, useState } from 'react';
import {
  LocationData,
  CurrentWeatherData,
  DailyForecast,
  getLocationData,
  getWeatherData
} from './api/weather';

function App() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherForCity = async (city: string) => {
    setLocationData(null);
    setCurrentWeather(null);
    setDailyForecast(null);
    setIsLoading(true);
    setError('');

    try {
      const location = await getLocationData(city);
      if (!location) {
        setError('找不到該城市');
        return;
      }
      setLocationData(location);

      const weatherData = await getWeatherData(location.latitude, location.longitude);
      if (!weatherData) {
        setError('無法取得天氣資訊');
        return;
      }
      setCurrentWeather(weatherData.currentWeather);
      setDailyForecast(weatherData.dailyForecast);
    } catch (err) {
      console.error(err);
      setError('資料請求錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherForCity('taiwan');
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Weather Dashboard</h1>

        {error &&
          <p className="text-red-500 mb-4">{error}</p>
        }

        {locationData?.name}

      </div>
    </div>
  );
}

export default App;
