import React from 'react';
import { CurrentWeatherData, LocationData } from '../api/weather';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  locationData: LocationData;
  currentWeather: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  locationData,
  currentWeather,
}) => {
  const { name, country } = locationData;
  const { temperature, humidity, weatherCode, windSpeed } = currentWeather;

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
          <p className="text-4xl">{temperature}°C</p>
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
