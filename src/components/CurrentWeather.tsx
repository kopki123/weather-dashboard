import React, { useContext } from 'react';
import { CurrentWeatherData, LocationData } from '../api/weather';
import WeatherIcon from './WeatherIcon';
import { WeatherContext } from '../contexts/WeatherContext';
import { celsiusToFahrenheit } from '../utils/celsiusToFahrenheit';

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
  } = weatherCtx;


  const { name, country } = locationData;
  const { temperature, humidity, weatherCode, windSpeed } = currentWeather;
  const displayTemperature = temperatureUnit === 'C' ? Math.round(temperature) : celsiusToFahrenheit(temperature);

  return (
    <div
      className="
        my-4
        transform transition-all duration-500
        opacity-0 animate-fadeIn
      "
    >
      <div className="mb-2 flex items-center text-2xl font-semibold">
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
