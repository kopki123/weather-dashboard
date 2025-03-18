import React, { createContext, useState, ReactNode } from 'react';

export interface WeatherContextType {
  city: string;
  temperatureUnit: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  toggleTemperatureUnit: () => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [city, setCity] = useState<string>('');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) => prev === 'C' ? 'F' : 'C');
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        temperatureUnit,
        setCity,
        toggleTemperatureUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
