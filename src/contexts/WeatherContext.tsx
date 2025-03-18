import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface WeatherContextType {
  city: string;
  temperatureUnit: string;
  favorites: string[];
  setCity: React.Dispatch<React.SetStateAction<string>>;
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  toggleTemperatureUnit: () => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities')!) || [];

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [city, setCity] = useState<string>('');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [favorites, setFavorites] = useState<string[]>(storedFavorites);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) => prev === 'C' ? 'F' : 'C');
  };

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter((fav) => fav !== city));
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        temperatureUnit,
        favorites,
        setCity,
        addFavorite,
        removeFavorite,
        toggleTemperatureUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
