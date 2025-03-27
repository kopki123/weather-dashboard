import React, { useMemo } from 'react';
import { getWeatherCondition } from '../utils/getWeatherCondition';

interface WeatherIconProps {
  weatherCode: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode, className }) => {
  const { 
    image,
    description,
  } = useMemo(() => getWeatherCondition(weatherCode), [weatherCode]);

  return (
    <img
      src={image}
      alt={description}
      className={className}
    />
  );
};

export default WeatherIcon;
