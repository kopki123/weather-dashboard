import React, { useContext, useState, useCallback } from 'react';
import {
  LocationData,
  CurrentWeatherData,
  DailyForecast,
  getLocationData,
  getWeatherData
} from './api/weather';
import { WeatherContext } from './contexts/WeatherContext';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SwitchButton from './components/SwitchButton';
import FavoriteCities from './components/FavoriteCities';

function App() {
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    city,
    temperatureUnit,
    setCity,
    toggleTemperatureUnit,
  } = weatherCtx;

  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherForCity = useCallback(async (city: string) => {
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
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      return;
    }

    await fetchWeatherForCity(city.trim());
  };

  const handleSelectFavorite = async (selectedCity: string) => {
    await fetchWeatherForCity(selectedCity);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Weather Dashboard</h1>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />

        <FavoriteCities
          onSelectCity={handleSelectFavorite}
        />

        {isLoading ? (
          <div className='mt-4 flex justify-center items-center'>
            <Loading />
          </div>
        ) : (
          <>
            {currentWeather && locationData && (
              <>
                <SwitchButton
                  onLabel='°C'
                  offLabel='°F'
                  initial={temperatureUnit === 'C'}
                  onToggle={toggleTemperatureUnit}
                />

                <CurrentWeather
                  locationData={locationData}
                  currentWeather={currentWeather}
                />
              </>
            )}

            {dailyForecast && (
              <Forecast
                dailyForecast={dailyForecast}
              />
            )}
          </>
        )}

        {error &&
          <p className="text-red-500 mb-4">{error}</p>
        }
      </div>
    </div>
  );
}

export default App;
