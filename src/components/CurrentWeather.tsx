import React, { useContext, useMemo } from 'react';
import { CurrentWeatherData, LocationData } from '../api/weather';
import WeatherIcon from './WeatherIcon';
import { WeatherContext } from '../contexts/WeatherContext';
import { celsiusToFahrenheit } from '../utils/celsiusToFahrenheit';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface CurrentWeatherProps {
  locationData: LocationData;
  currentWeather: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  locationData,
  currentWeather,
}) => {
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    temperatureUnit,
    favorites,
    addFavorite,
    removeFavorite,
  } = weatherCtx;

  const { name, country } = locationData;
  const { temperature, humidity, weatherCode, windSpeed } = currentWeather;
  
  const displayTemperature = useMemo(() => {
    return temperatureUnit === 'C' 
      ? Math.round(temperature)
      : celsiusToFahrenheit(temperature);
  }, [temperature, temperatureUnit]);

  const isFavorite = favorites.includes(locationData.name);

  const handleToggleFavorite = () => {
    if(isFavorite) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  return (
    <div
      className="
        my-4
        transform transition-all duration-500
        opacity-0 animate-fadeIn
      "
    >
      <div className="mb-2 flex items-center text-2xl font-semibold">
        <button
          className="mr-2 hover:scale-105 hover:cursor-pointer"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <FaStar size={20} className="text-yellow-500" />
          ) : (
            <FaRegStar size={20} className="text-gray-400" />
          )}
        </button>

        <p>{name}, {country}</p>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center gap-6'>
        <div className='flex items-center gap-2'>
          <WeatherIcon
            weatherCode={weatherCode}
            className='w-20 h-20'
          />
          <p className="text-4xl">{displayTemperature}°{temperatureUnit}</p>
        </div>

        <div>
          <p className="text-xs">風速：{windSpeed} km/h</p>
          <p className="text-xs">濕度：{humidity} %</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
