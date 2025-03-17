import React from 'react';
import WeatherIcon from './WeatherIcon';
import getWeekdayName from '../utils/getWeekdayName';
import { DailyForecast } from '../api/weather';

interface ForecastProps {
  dailyForecast: DailyForecast;
}

const Forecast: React.FC<ForecastProps> = ({ dailyForecast }) => {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">每日預報</h3>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-5">
        {dailyForecast.map(({ maxTemperature, minTemperature, weatherCode, time }) => {
          const weekdayName = getWeekdayName(new Date(time));
          const date = new Date(time).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' });

          return (
            <div
              key={time}
              className="
                p-2
                flex justify-between items-center
                md:flex-col
                bg-blue-100
                rounded-lg
                transform transition-all duration-500
                opacity-0 animate-fadeIn
              "
            >
              <div className='md:text-center'>
                <p className="mb-2 text-sm font-semibold">
                  {weekdayName}
                </p>

                <p className="text-xs text-gray-700">
                  {date}
                </p>
              </div>

              <WeatherIcon
                weatherCode={weatherCode}
                className='w-16 h-16'
              />

              <div className='flex flex-col md:flex-row justify-between items-center gap-2 text-xs'>
                <p>{maxTemperature}°</p>
                <p className='text-gray-700'>{minTemperature}°</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
