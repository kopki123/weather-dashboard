import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DailyForecast } from '../api/weather';
import { WeatherContext } from '../contexts/WeatherContext';
import getWeekdayName from '../utils/getWeekdayName';
import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  selectedTime: string;
  dailyForecast: DailyForecast;
  onClick: (time: string) => void;
}

const Forecast: React.FC<ForecastProps> = ({
  selectedTime,
  dailyForecast,
  onClick,
}) => {
  const { t } = useTranslation();
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    temperatureUnit,
  } = weatherCtx;

  const currentDate = new Date(selectedTime).getDate();
  const currentDateIndex = dailyForecast.findIndex(({ time }) => currentDate === new Date(time).getDate());

  return (
    <div className='mt-8'>
      <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-8'>
        {dailyForecast.map(({ maxTemperature, minTemperature, weatherCode, time }, index) => {
          const isTemperatureUnitCelsius = temperatureUnit === 'C';
          const displayMaxTemp = isTemperatureUnitCelsius ? Math.round(maxTemperature) : celsiusToFahrenheit(maxTemperature);
          const displayMinTemp = isTemperatureUnitCelsius ? Math.round(minTemperature) : celsiusToFahrenheit(minTemperature);
          const weekdayName = getWeekdayName(new Date(time));
          const date = new Date(time).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' });

          return (
            <div
              key={time}
              className={
                `
                  animate-fadeIn
                  p-2
                  md:p-1
                  flex justify-between items-center
                  md:flex-col
                  rounded-lg
                  opacity-0
                  transform transition-all duration-500
                  ${currentDateIndex === index ? 'bg-blue-100' : 'bg-blue-100/70 cursor-pointer'}
                `
              }
              onClick={() => onClick(time)}
            >
              <div className='md:text-center'>
                <p className='mb-2 text-sm font-semibold'>
                  {t(weekdayName)}
                </p>

                <p className='text-xs text-gray-500'>
                  {date}
                </p>
              </div>

              <WeatherIcon
                weatherCode={weatherCode}
                className='w-16 h-16'
              />

              <div
                className='
                    flex flex-col justify-between items-center gap-2
                    md:flex-row
                    text-xs
                  '
                >
                <p>{displayMaxTemp}°</p>

                <p className='text-gray-500'>
                  {displayMinTemp}°
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
