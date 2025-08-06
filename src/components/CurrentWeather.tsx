import React, { useContext, useMemo } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { CurrentWeatherData, LocationData } from '../api/weather';
import { WeatherContext } from '../contexts/WeatherContext';
import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import formatTimeIntl from '../utils/formatTimeIntl';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  locationData: LocationData;
  currentWeather: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  locationData,
  currentWeather,
}) => {
  const { t } = useTranslation();
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    locale,
    temperatureUnit,
    favorites,
    addFavorite,
    removeFavorite,
  } = weatherCtx;

  const {
    name,
    country,
  } = locationData;

  const {
    time,
    temperature,
    humidity,
    weatherCode,
    windSpeed,
    precipitationProbability,
  } = currentWeather;

  const isFavorite = favorites.includes(locationData.name);

  const formattedTime = useMemo(() => formatTimeIntl(time, locale), [time, locale]);

  const displayTemperature = useMemo(() => {
    return temperatureUnit === 'C'
      ? Math.round(temperature)
      : celsiusToFahrenheit(temperature);
  }, [temperature, temperatureUnit]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  return (
    <div
      className='
        my-4
        transform transition-all duration-500
        opacity-0 animate-fadeIn
      '
    >
      <div className='mb-2 flex items-center text-2xl font-semibold'>
        <button
          className='mr-2 hover:scale-105 hover:cursor-pointer'
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <FaStar
              size={20}
              className='text-yellow-500'
            />
          ) : (
            <FaRegStar
              size={20}
              className='text-gray-400'
            />
          )}
        </button>

        <p>{name}, {country}</p>
      </div>

      <div className='mt-4 flex flex-col sm:flex-row sm:items-center gap-6'>
        <div className='flex items-center gap-2'>
          <WeatherIcon
            weatherCode={weatherCode}
            className='w-20 h-20'
          />

          <p className='text-4xl'>
            {displayTemperature}°{temperatureUnit}
          </p>
        </div>

        <div
          className='
            grow self-start
            w-full sm:w-auto
            flex justify-between
            text-gray-500
          '
        >
          <div className='flex flex-col'>
            <p className='text-xs'>
              {t('precipitation_probability')}：{precipitationProbability}%
            </p>

            <p className='text-xs'>
              {t('humidity')}：{humidity}%
            </p>

            <p className='text-xs'>
              {t('wind_speed')}：{windSpeed} {t('km/h')}
            </p>
          </div>

          <div className='flex flex-col items-end'>
            <p className='text-xl text-black'>
              {t('weather')}
            </p>

            <p>
              {formattedTime}
            </p>

            <p>
              {t(`wmo_code.${weatherCode}`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
